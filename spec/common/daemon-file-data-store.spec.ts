import {
  DaemonFileDataStore
} from '../../src/common/datemon-file-data-store';
import fs from 'fs';

test('It should throw FileDoesNotExistException when updatePath is called without create option.', () => {
  try {
    DaemonFileDataStore.Instance.updatePath('./bogus/path.json', false);
    fail();
  } catch (e) {
    expect(e.message).toContain('path.json');
  }
});

test('It should create a new settings file when updatePath is called with create option.', () => {
  try {
    DaemonFileDataStore.Instance.updatePath('./test.json', true);
    expect(fs.existsSync('./test.json')).toEqual(true);
    fs.unlinkSync('./test.json');
  } catch (e) {
    fail(e.message);
  }
});

test('It should store the settings in memory for retrieval.', () => {
  try {
    DaemonFileDataStore.Instance.updatePath('./test.json', true);
    DaemonFileDataStore.Instance.set('key', 'value');

    expect(DaemonFileDataStore.Instance.get<string>('key')).toEqual('value');
    fs.unlinkSync('./test.json');
  } catch (e) {
    fail(e.message);
  }
});

test('It should store the settings in the given path when save is called', () => {
  try {
    DaemonFileDataStore.Instance.updatePath('./test.json', true);
    DaemonFileDataStore.Instance.set('key', 'value');
    DaemonFileDataStore.Instance.save();

    const json = fs.readFileSync('./test.json').toString();
    const obj = JSON.parse(json);

    expect(obj.key).toEqual('value');

    fs.unlinkSync('./test.json');
  } catch (e) {
    fail(e.message);
  }
});
