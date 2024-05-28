export interface DocModel {
  id: string,
  label: string,
  component: any,
  doc?: DocModel[],
  children?: DocModel[],
}
