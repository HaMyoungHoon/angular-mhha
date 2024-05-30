export interface IRestResult<T> {
  Result?: boolean,
  Code?: number,
  Msg?: string,
  Data?: T
}
