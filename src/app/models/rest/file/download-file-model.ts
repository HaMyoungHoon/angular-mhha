import {HttpResponse} from "@angular/common/http";

export class DownloadFileModel {
  orgFileName: string | null = null;
  fileName: string | null = null;
  fileSize: number = 0;
  url: string | null = null;
  constructor() {
  }

  parseHttpResponse(data?: HttpResponse<any>): DownloadFileModel {
    if (data === undefined) {
      return this;
    }

    this.fileSize = data.body.size;
    try {
      const contentDisposition = data.headers.get("content-disposition");
      this.fileName = this.getFilenameFromContentDisposition(contentDisposition);
    } catch (e: any) {
      this.fileName = `download-file_${new Date().toLocaleDateString()}`;
    }
    this.orgFileName = this.fileName;
    this.url = window.URL.createObjectURL(data.body);

    const fileNameLength = this.fileName.length;
    if (fileNameLength > 20) {
      this.fileName = this.fileName.substring(0, 10) + this.fileName.substring(fileNameLength - 10, fileNameLength);
    }
    return this;
  }
  getFilenameFromContentDisposition(contentDisposition: string | null): string {
    if (!contentDisposition) {
      return `download-file_${new Date().toLocaleDateString()}`;
    }

    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    let filename = '';

    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }

    const filenameStarRegex = /filename\*=([^;]+)/;
    const matchesStar = filenameStarRegex.exec(contentDisposition);

    if (matchesStar != null && matchesStar[1]) {
      const parts = matchesStar[1].split("''");
      if (parts.length === 2) {
        filename = decodeURIComponent(parts[1]);
      }
    }

    return filename;
  }
}
