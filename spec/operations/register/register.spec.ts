import { SocketMock } from "../../mocks/socket-mock";
import {
  register
} from '../../../src/operations/register/register';
import { REGISTER, POST_REGISTER } from "../../../../weaver-common/src/common/events";
import { RegistrationRequest } from "../../../../weaver-common/src/operations/register/register-request";
import { RegistrationResponse } from "../../../../weaver-common/src/operations/register/register-response";
import { StatusCodes } from "../../../../weaver-common/src/enums/status-codes";
import { Client } from "../../../../weaver-common/src/common/client";

test('register successfully registers client with valid data', async () => {
  const socket = new SocketMock();

  socket.on(REGISTER, (req: RegistrationRequest) => {
    expect(req).toBeDefined();
    expect(req.data).toBeDefined();
    expect((req.data || new Client()).isValid()).toBeTruthy();

    const response = new RegistrationResponse();

    response.status = StatusCodes.Success;

    socket.emit(POST_REGISTER, response);
  });

  try {
    await register(socket);
  } catch (e) {
    fail(e.message);
  }
});

test('register fails successfully with invalid data.', async () => {
  const socket = new SocketMock();

  socket.on(REGISTER, (req: RegistrationRequest) => {
    const response = new RegistrationResponse();

    response.status = StatusCodes.Failure;

    socket.emit(POST_REGISTER, response);
  });

  try {
    await register(socket);
    fail();
  } catch (e) { }
});
