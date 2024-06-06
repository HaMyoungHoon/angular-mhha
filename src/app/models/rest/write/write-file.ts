import {WriteFileStatus} from "./write-file-status";

export interface WriteFile {
  thisIndex?: number,
  name: string,
  content?: string,
  authIndex?: number,
  status?: WriteFileStatus,
  writeDirectoryThisIndex?: number
}
