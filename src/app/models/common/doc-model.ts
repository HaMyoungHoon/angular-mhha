export interface DocModel {
  id: string,
  label: string,
  description: string,
  isInterface: boolean,
  component: any,
  doc?: DocModel[],
  children?: DocModel[],
}
