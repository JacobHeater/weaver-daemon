export class SocketMock implements SocketIOClient.Socket {
  io: SocketIOClient.Manager;
  nsp: string;
  id: string;
  connected: boolean;
  disconnected: boolean;

  private _listeners: { [key: string]: Function[] } = {};

  open(): SocketIOClient.Socket {
    return this;
  }
  connect(): SocketIOClient.Socket {
    return this;
  }
  send(...args: any[]): SocketIOClient.Socket {
    return this;
  }
  emit(event: string, ...args: any[]): SocketIOClient.Socket {
    (this._listeners[event] || []).forEach(l => l(...args));

    return this;
  }
  close(): SocketIOClient.Socket {
    return this;
  }
  disconnect(): SocketIOClient.Socket {
    return this;
  }
  compress(compress: boolean): SocketIOClient.Socket {
    return this;
  }
  on(event: string, fn: Function): SocketIOClient.Emitter {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(fn);

    return this;
  }
  addEventListener(event: string, fn: Function): SocketIOClient.Emitter {
    return this.on(event, fn);
  }
  once(event: string, fn: Function): SocketIOClient.Emitter {
    return this;
  }
  off(event: string, fn?: Function): SocketIOClient.Emitter {
    if (fn) {
      const index = this._listeners[event].indexOf(fn);

      this._listeners[event].splice(index, 1);
    } else {
      delete this._listeners[event];
    }

    return this;
  }
  removeListener(event: string, fn?: Function): SocketIOClient.Emitter {
    return this.off(event, fn);
  }
  removeEventListener(event: string, fn?: Function): SocketIOClient.Emitter {
    return this.off(event, fn);
  }
  removeAllListeners(): SocketIOClient.Emitter {
    this._listeners = {};

    return this;
  }
  listeners(event: string): Function[] {
    return this._listeners[event];
  }
  hasListeners(event: string): boolean {
    return this._listeners[event].length > 0;
  }


};
