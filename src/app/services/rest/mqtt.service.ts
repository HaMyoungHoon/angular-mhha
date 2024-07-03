import { Injectable } from '@angular/core';
import {HttpResponseInterceptorService} from "../common/http-response-interceptor.service";
import {IRestResult} from "../../models/common/IRestResult";
import {MqttConnectModel} from "../../models/rest/mqtt/mqtt-connect-model";
import mqtt from "mqtt";
import * as FExtensions from "../../guards/f-extentions";
import {Subject} from "rxjs";
import {MqttMessageModel} from "../../models/rest/mqtt/mqtt-message-model";

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private baseUrl = "/apiSpring/v1/mqtt";
  mqttClient?: mqtt.MqttClient
  mqttMessageSubject: Subject<MqttMessageModel> = new Subject();

  constructor(private httpResponse: HttpResponseInterceptorService) {
  }

  getSubscribeData(guid: string | undefined = undefined): Promise<IRestResult<MqttConnectModel>> {
    let url = `${this.baseUrl}/get/subscribeData`;
    if (guid) {
      url += `/${guid}`;
    }

    return this.httpResponse.get(url);
  }
  postPublish(guid: string | undefined = undefined, topic: string = "", msg: string = ""): Promise<IRestResult<string>> {
    let url = `${this.baseUrl}/post/publish`;
    if (guid) {
      url += `/${guid}`;
    }
    this.httpResponse.addParam("topic", topic);
    this.httpResponse.addParam("msg", msg);
    return this.httpResponse.post(url)
  }
  publishTopic(topic: string = "", msg: string = ""): void {
    if (this.mqttClient === undefined || this.mqttClient === null) {
      return;
    }
    if (this.mqttClient.disconnected) {
      return;
    }
    const buff = FExtensions.toBuffer(msg);
    this.mqttClient.publish(topic, buff);
  }

  mqttConnect(mqttConnectData: MqttConnectModel, catchFunc: FExtensions.anyFunc): void {
    try {
      const options: mqtt.IClientOptions = {
        defaultProtocol: "wss",
        protocol: "wss",
        clientId: `angular_${mqttConnectData.topic.join(",")}`,
        username: mqttConnectData.userName,
        password: mqttConnectData.password
      };
      const search = mqttConnectData.brokerUrl.filter(x => x.includes("ws://") || x.includes("wss://"));
      if (search.length <= 0) {
        catchFunc("something wrong");
        return;
      }
      this.mqttClient = mqtt.connect(search[0], options);
      this.mqttClient.on("connect", () => {
        mqttConnectData.topic.forEach(x => {
          this.mqttClient?.subscribe(x, (err) => {
            if (err) {
              catchFunc(err);
            }
          });
        });
      });
      this.mqttClient.on("message", (topic: string, message: Buffer): void => {
        this.mqttMessageSubject.next(new MqttMessageModel().parseThis(topic, message));
      });
    } catch (e: any) {
      catchFunc(e);
    }
  }
  mqttDisconnect(): void {
    if (this.mqttClient?.connected) {
      this.mqttClient.end();
    }
  }
  setMqttMessageObserver(func: FExtensions.anyFunc | undefined): void {
    this.mqttMessageSubject.pipe().subscribe((x: MqttMessageModel): void => {
      if (func) {
        func(x);
      }
    });
  }
}
