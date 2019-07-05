import { SocketMock } from "../../mocks/socket-mock";
import {
  executeScript
} from '../../../src/operations/scripts/execute-script';
import {
  POST_EXECUTE_SCRIPT,
  EXECUTE_SCRIPT
} from '../../../../weaver-common/src/common/events';

test('executeScript returns io string when script is invoked', () => {
  const socket = new SocketMock();

  socket.on(POST_EXECUTE_SCRIPT, (io: string) => {
    expect(io).not.toEqual('');
    expect(io).toContain('README.md');
  });

  executeScript(socket);

  socket.emit(EXECUTE_SCRIPT, 'ls')
});

test('executeScript returns empty io when emitted with empty script', () => {
  const socket = new SocketMock();

  socket.on(POST_EXECUTE_SCRIPT, (io: string) => {
    expect(io).toEqual('');
  });

  executeScript(socket);

  socket.emit(EXECUTE_SCRIPT, '')
});

test('executeScript returns empty io when emitted with null script', () => {
  const socket = new SocketMock();

  socket.on(POST_EXECUTE_SCRIPT, (io: string) => {
    expect(io).toEqual('');
  });

  executeScript(socket);

  socket.emit(EXECUTE_SCRIPT, null)
});
