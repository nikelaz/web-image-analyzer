import jsonToCsv from '../../src/helpers/json-to-csv';

describe('jsonToCsv()', () => {
  test('correctly converts json to csv', () => {
    const obj = [
      { foo: 'bar', bar: 'foo' },
      { foo: 'bar2', bar: 'foo2' }
    ];
    expect(jsonToCsv(obj).replace(/\s/g, '')).toEqual('foo,bar"bar","foo""bar2","foo2"')
  });
});
