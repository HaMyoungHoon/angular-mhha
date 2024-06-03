export class BokStatisticSearchRequest {
  searchPath: string;
  authKey: string;
  langType: string;
  startNumber: number;
  endNumber: number;
  code: string;
  cycle: string;
  startDate: number;
  endDate: number;
  listCode1?: string;
  listCode2?: string;
  listCode3?: string;
  listCode4?: string;
  constructor() {
    this.searchPath = "StatisticSearch";
    this.authKey = "sample";
    this.langType = "kr";
    this.startNumber = 1;
    this.endNumber = 10;
    this.code = "200Y001";
    this.cycle = "A";
    this.startDate = 2015;
    this.endDate = 2021;
    this.listCode1 = "10101";
  }

  getUrl(): string {
    let url = `${this.searchPath}/${this.authKey}/json/${this.langType}/${this.startNumber}/${this.endNumber}/${this.code}/${this.cycle}/${this.startDate}/${this.endDate}`;
    if (this.listCode1) url += `/${this.listCode1}`;
    if (this.listCode2) url += `/${this.listCode2}`;
    if (this.listCode3) url += `/${this.listCode3}`;
    if (this.listCode4) url += `/${this.listCode4}`;
    return url;
  }
}
