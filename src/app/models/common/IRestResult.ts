export interface IRestResult<T> {
  result?: boolean,
  code?: number,
  msg?: string,
  data?: T
}
