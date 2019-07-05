import io from 'socket.io-client';
import { Configuration } from './common/configuration.js';
import settings from './settings.json';
import { register } from './operations/register/register.js';
import { executeScript } from './operations/scripts/execute-script.js';
import { CONNECT } from '../../weaver-common/src/common/events.js';

const config: Configuration = settings as Configuration;

const socket = io(config.backend.url);

socket.on(CONNECT, async () => {
  console.log(`Daemon connected to host at "${config.backend.url}."`);

  // Register the client, and await success response.
  await register(socket);

  // Continue to set up other listeners.
  executeScript(socket);
});