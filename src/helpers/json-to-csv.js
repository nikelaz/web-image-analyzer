/**
 * Converts JSON to CSV
 * Will take the headers from the first element
 */
function jsonToCsv(json) {
  const fields = Object.keys(json[0]);
  const replacer = (key, value) => value === null ? '' : value;
  const csv = json.map((row) => {
    return fields.map((fieldName) => {
      return JSON.stringify(row[fieldName], replacer)
    }).join(',')
  });
  csv.unshift(fields.join(','))
  return csv.join('\r\n');
};

export default jsonToCsv;
