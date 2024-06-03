import {BokResult} from "./bok-result";
import {BokStatisticTableList} from "./bok-statistic-table-list";
import {BokKeyStatisticList} from "./bok-key-statistic-list";
import {BokStatisticSearch} from "./bok-statistic-search";

export interface BokResponse {
  RESULT?: BokResult,
  StatisticTableList?: BokStatisticTableList,
  StatisticSearch?: BokStatisticSearch,
  KeyStatisticList?: BokKeyStatisticList,
}
