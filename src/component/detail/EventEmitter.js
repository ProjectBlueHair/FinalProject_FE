import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  // seekAll: (event, fn) => eventEmitter.once(event, fn),
  // soloON: (event, fn) => eventEmitter.once(event, fn),
  // soloOFF: (event, fn) => eventEmitter.once(event, fn),
};

Object.freeze(Emitter);

export default Emitter;
