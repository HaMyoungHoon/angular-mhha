import {DocComponentsEmitsValuesParameters} from "./DocComponentsEmitsValuesParameters";

export interface DocComponentsEmitsValue {
  thisIndex: number,
  name: string,
  description: string,
  docComponentsEmitsValuesParameters?: DocComponentsEmitsValuesParameters[] | null
}
