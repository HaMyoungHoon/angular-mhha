import {WriteDirectoryStatus} from "./write-directory-status";
import {WriteFile} from "./write-file";

export interface WriteDirectory {
  thisIndex: number,
  dirName: string,
  status: WriteDirectoryStatus,
  children?: WriteDirectory[],
  writeFiles?: WriteFile[]
}
