import fs from 'fs';
function getFileContent(path) {
  return fs.readFileSync(path).toString();
}


export { getFileContent }
