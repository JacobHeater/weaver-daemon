import io from 'socket.io-client';
import { Configuration } from './common/configuration.js';
import settings from './settings.json';
import { register } from './operations/register/register.js';

const config: Configuration = settings as Configuration;
const events = {
  connect: 'connect'
};

const socket = io(config.backend.url);

socket.on(events.connect, async () => {
  console.log(`Daemon connected to host at "${config.backend.url}."`);

  await register(socket);

  console.log('Registered!');
});
