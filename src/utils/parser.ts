import yaml from 'js-yaml';

function parseKeyValueFormat(fileContent: string) {
  return parseEnvTypeFile(fileContent);
}

function parseYmlFormat(fileContent: string) {
  return yaml.load(fileContent);
}

function parseJsonFormat(fileContent: string) {
  return JSON.parse(fileContent);
}

function parseEnvTypeFile(src: string): Record<string, string> {
  const obj: Record<string, string> = {};
  // 라인 별로 분리하여 처리
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      value = value.trim();

      // Detect surrounding quotes
      const firstChar = value[0];
      if (firstChar === '"' || firstChar === "'") {
        // Remove the first and last character (quotes)
        value = value.substring(1, value.length - 1);
        
        // Handle escape sequences for double quotes
        if (firstChar === '"') {
          value = value.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        } else if (firstChar === "'") {
          value = value.replace(/\\'/g, "'");
        }
      }
      
      obj[key] = value;
    }
  }
  
  return obj;
}

export { parseKeyValueFormat, parseYmlFormat, parseJsonFormat }
