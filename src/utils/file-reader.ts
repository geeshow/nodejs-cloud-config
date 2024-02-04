import fs from 'fs';
function getFileContent(path: string) {
  return fs.readFileSync(path).toString();
}


export { getFileContent }
