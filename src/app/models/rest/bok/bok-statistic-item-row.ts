export interface BokStatisticItemRow {
  STAT_CODE: string,
  STAT_NAME: string,
  GRP_CODE: string,
  GRP_NAME: string,
  ITEM_CODE: string,
  ITEM_NAME: string,
  P_ITEM_CODE?: string,
  P_ITEM_NAME?: string,
  CYCLE: string,
  START_TIME: string,
  END_TIME: string,
  DATA_CNT: number,
  UNIT_NAME: string,
  WEIGHT?: string
}
