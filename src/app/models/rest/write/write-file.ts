import {WriteFileStatus} from "./write-file-status";

export class WriteFile {
  thisIndex: number = 0;
  name: string = "";
  content?: string;
  authIndex?: number;
  status?: WriteFileStatus;
  writeDirectoryThisIndex?: number
}
