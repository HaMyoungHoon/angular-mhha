import {DocComponentsPropsValues} from "./DocComponentsPropsValues";

export interface DocComponentsProps {
  thisIndex: number,
  description: string,
  docComponentsPropsValues?: DocComponentsPropsValues[] | null
}
