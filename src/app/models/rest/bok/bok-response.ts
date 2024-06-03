import {BokResult} from "./bok-result";
import {BokStatisticTableList} from "./bok-statistic-table-list";
import {BokKeyStatisticList} from "./bok-key-statistic-list";
import {BokStatisticSearch} from "./bok-statistic-search";
import {BokStatisticItemList} from "./bok-statistic-item-list";

export interface BokResponse {
  RESULT?: BokResult,
  StatisticTableList?: BokStatisticTableList,
  StatisticSearch?: BokStatisticSearch,
  KeyStatisticList?: BokKeyStatisticList,
  StatisticItemList?: BokStatisticItemList,
}
