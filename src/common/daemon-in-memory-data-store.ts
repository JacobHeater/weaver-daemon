import {
  InMemoryDataStore
} from '../../../weaver-common/src/common/in-memory-data-store';

export class DaemonInMemoryDataStore extends InMemoryDataStore {
  private constructor() {
    super();
  }

  public static Instance: DaemonInMemoryDataStore = new DaemonInMemoryDataStore();
};
