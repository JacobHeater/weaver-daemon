import { RegistrationRequest } from '../../../../weaver-common/src/operations/register/register-request';
import { RegistrationResponse } from '../../../../weaver-common/src/operations/register/register-response';
import { Client } from '../../../../weaver-common/src/common/client';
import { StatusCodes } from '../../../../weaver-common/src/enums/status-codes';
import { getComputerName, getUserName } from '../../../../weaver-common/src/helpers/system-helpers';
import {
  REGISTER,
  POST_REGISTER
} from '../../../../weaver-common/src/common/events';
import uuid from 'uuid/v4';
import os from 'os';

export async function register(socket: SocketIOClient.Socket): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const client = new Client(uuid());
    const request = new RegistrationRequest(client.id);
  
    client.computerName = getComputerName();
    client.userPrincipalName = getUserName();
  
    request.data = client;
    
    socket.on(POST_REGISTER, (response: RegistrationResponse) => {
      if (response.status == StatusCodes.Success) {
        resolve();
      } else {
        reject(response.failureReasons.join(os.EOL));
      }
    });
  
    socket.emit(REGISTER, request);
  });
};
