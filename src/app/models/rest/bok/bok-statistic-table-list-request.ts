export class BokStatisticTableListRequest {
  authKey: string;
  langType: string;
  startNumber: number;
  endNumber: number;
  code?: string;

  constructor() {
    this.authKey = "sample";
    this.langType = "kr";
    this.startNumber = 1;
    this.endNumber = 10;
  }

  getUrl(): string {
    let url = `${this.authKey}/json/${this.langType}/${this.startNumber}/${this.endNumber}`;
    if (this.code) url += `/${this.code}`;
    return url;
  }
}
