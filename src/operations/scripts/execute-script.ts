import {
  EXECUTE_SCRIPT, POST_EXECUTE_SCRIPT
} from '../../../../weaver-common/src/common/events';
import { execSync } from 'child_process';

export function executeScript(socket: SocketIOClient.Socket): void {
  socket.on(EXECUTE_SCRIPT, (script: string) => {
    let io: string = '';

    if (!(script || '').trim()) {
      socket.emit(POST_EXECUTE_SCRIPT, io);

      return;
    }

    try {
      io = execSync(script).toString();
    } catch (e) {
      io = e.message;
    }

    socket.emit(POST_EXECUTE_SCRIPT, io);
  });
};
