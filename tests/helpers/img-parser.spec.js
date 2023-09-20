import { extractSrc } from '../../src/helpers/img-parser.js';
import imgParser from '../../src/helpers/img-parser.js';

describe('extractSrc()', () => {
  test('extracts src url correctly', () => {
    const testUrl = 'https://foo.bar/test'
    expect(extractSrc(` src="${testUrl}" /><p>`)).toBe(testUrl);
    expect(extractSrc(` src='${testUrl}' /><p>`)).toBe(testUrl);
  });

  test('returns null with invalid input', () => {
    expect(extractSrc('foo')).toBe(null);
    expect(extractSrc('src=@')).toBe(null);
  })
});

describe('imgParser()', () => {
  test('imgParser()', () => {
    const testMarkup = `
      <html>
        <body>
          <img src="test1" />
          <img src="test2" />
          <div>Test El</div>
          <img src="test3" />
        </body>
      </html>
    `;
    const images = imgParser(testMarkup);
    expect(images.length).toBe(3);
    expect(images[0]).toBe('test1');
    expect(images[1]).toBe('test2');
    expect(images[2]).toBe('test3');
  });
});