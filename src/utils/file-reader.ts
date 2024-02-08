import fs from 'fs';
export function getFileContent(path: string) {
  return fs.readFileSync(path).toString();
}
