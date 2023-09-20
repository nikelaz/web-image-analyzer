export function extractSrc(subStr) {
  const srcStart = subStr.split('src=')[1];
  if (!srcStart) return null;
  const quote = Array.from(srcStart)[0];
  if (quote !== '"' && quote !== '\'') return null;
  return srcStart.split(quote)[1].split(quote)[0];
}

function imgParser(html) {
  const imgVector = html.split('<img');
  imgVector.shift();
  return imgVector.map(subStr => extractSrc(subStr));
}

export default imgParser;
