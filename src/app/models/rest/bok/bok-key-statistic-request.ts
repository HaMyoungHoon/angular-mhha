export class BokKeyStatisticRequest {
  keyStatisticPath: string;
  authKey: string;
  langType: string;
  startNumber: number;
  endNumber: number;
  constructor() {
    this.keyStatisticPath = "KeyStatisticList"
    this.authKey = "sample";
    this.langType = "kr";
    this.startNumber = 1;
    this.endNumber = 10;
  }

  getUrl(): string {
    return `${this.keyStatisticPath}/${this.authKey}/json/${this.langType}/${this.startNumber}/${this.endNumber}`;
  }
}
