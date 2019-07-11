import {
  FileDataStore
} from '../../../weaver-common/src/common/file-data-store';

export class DaemonFileDataStore extends FileDataStore {
  private constructor() {
    super('./weaverfile.json', true);
  }

  static Instance: DaemonFileDataStore = new DaemonFileDataStore();
};
