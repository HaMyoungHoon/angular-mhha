export interface BokStatisticSearchRequest {
  authKey: string,
  langType: string,
  startNumber: number,
  endNumber: number,
  code: string,
  cycle: string,
  startDate: number,
  endDate: number,
  listCode1?: string,
  listCode2?: string,
  listCode3?: string,
  listCode4?: string,
}
