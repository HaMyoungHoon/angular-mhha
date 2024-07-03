import {afterNextRender, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MqttService} from "../../../../services/rest/mqtt.service";
import {FDialogService} from "../../../../services/common/f-dialog.service";
import {MqttConnectModel} from "../../../../models/rest/mqtt/mqtt-connect-model";

@Component({
  selector: 'app-mqtt-test',
  templateUrl: './mqtt-test.component.html',
  styleUrl: './mqtt-test.component.scss'
})
export class MqttTestComponent implements OnDestroy {
  mqttConnectData?: MqttConnectModel;
  selectedTopic?: string;
  publishData: string = "";
  subscribeData: string = "";
  thisGuid: string = crypto.randomUUID();
  constructor(private cd: ChangeDetectorRef, private fDialogService: FDialogService, private mqttService: MqttService) {
    this.init();
    afterNextRender(() => {
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.mqttService.mqttDisconnect();
  }

  init(): void {
    this.mqttService.getSubscribeData(this.thisGuid).then(x => {
      if (x.result) {
        this.mqttConnectData = x.data;
        this.selectedTopic = this.mqttConnectData?.topic[0];
        this.mqttInit();
        return;
      }
      this.fDialogService.warn('init', x.msg);
    }).catch(x => {
      this.fDialogService.error('init', x.message);
    });
  }
  mqttInit(): void {
    if (this.mqttConnectData === undefined || this.mqttConnectData === null) {
      return;
    }
    this.mqttService.setMqttMessageObserver(x => {
      this.subscribeData += `[${x.topic}]\t${x.message}\n`;
    });

    this.mqttService.mqttConnect(this.mqttConnectData, (x): void => {
      this.fDialogService.error('init', x);
    });
  }

  selectTopic(data: any): void {
  }
  postPublish(): void {
    if (this.selectedTopic === undefined || this.selectedTopic === null) {
      return;
    }
    if (this.publishData.length <= 0) {
      return;
    }

//    this.mqttService.publishTopic(this.selectedTopic, this.publishData);
    this.mqttService.postPublish(this.thisGuid, this.selectedTopic, this.publishData).then(x => {
      if (x.result) {
        this.publishData = "";
        return;
      }
      this.fDialogService.warn('publish', x.msg);
    }).catch(x => {
      this.fDialogService.error('publish', x.message);
    });
  }
  get postDisable(): boolean {
    if (this.publishData.length <= 0) {
      return true;
    }
    if (this.selectedTopic === undefined || this.selectedTopic === null) {
      return true;
    }

    return false;
  }
}
