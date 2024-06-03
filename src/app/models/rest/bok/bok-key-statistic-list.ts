import {BokKeyStatisticRow} from "./bok-key-statistic-row";

export interface BokKeyStatisticList {
  list_total_count: number,
  row_count: number,
  row: BokKeyStatisticRow[]
}
