import {
  FileDataStore
} from '../../../weaver-common/src/common/file-data-store';

export class DaemonFileDataStore extends FileDataStore {
  private constructor() {
    super('./daemonfile.json', true);
  }

  public static Instance: DaemonFileDataStore = new DaemonFileDataStore();
};
