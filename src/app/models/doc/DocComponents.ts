import {DocComponentsEmits} from "./DocComponentsEmits";
import {DocComponentsProps} from "./DocComponentsProps";


export interface DocComponents {
  thisIndex: number,
  name: string,
  description: string,
  docComponentsEmits?: DocComponentsEmits | null,
  docComponentsProps?: DocComponentsProps | null,
}
