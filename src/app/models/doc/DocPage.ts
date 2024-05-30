import {DocComponents} from "./DocComponents";
import {DocInterfaces} from "./DocInterfaces";

export interface DocPage {
  thisIndex: number,
  name: string,
  docComponents?: DocComponents | null,
  docInterfaces?: DocInterfaces | null,
}
