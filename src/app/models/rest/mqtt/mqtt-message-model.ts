export class MqttMessageModel {
  topic: string = "";
  message: string = "";
  constructor(topic: string = "", message: string = "") {
    this.topic = topic;
    this.message = message;
  }
  parseThis(topic: string, message: Buffer): MqttMessageModel {
    this.topic = topic;
    this.message = new TextDecoder("UTF-8").decode(message);
    return this;
  }
}
