import {
  DaemonInMemoryDataStore
} from '../../src/common/daemon-in-memory-data-store';

test('get<T>(key, defaultValue) should return default value for unknown key', () => {
  const key = 'unknown';
  const value = DaemonInMemoryDataStore.Instance.get<string>(key, 'value');

  expect(value).toEqual('value');
});

test('get<T>(key) should return undefined for unknown key without default value', () => {
  const key = 'unknown';
  const value = DaemonInMemoryDataStore.Instance.get<string>(key);

  expect(value).toBeUndefined();
});

test('set<T>(key, value) should set the value', () => {
  const key = 'key';
  const value = 'value';

  DaemonInMemoryDataStore.Instance.set(key, value);
  
  expect(DaemonInMemoryDataStore.Instance.get(key)).toEqual(value);
});
