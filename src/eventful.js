/* eslint-disable no-param-reassign */
import EventEmitter from 'events';

const eventful = (target) => {
  const ee = new EventEmitter();

  target.on = (event, listener) => {
    if (!listener) {
      return;
    }
    ee.on(event, listener);
  };

  target.off = (event, listener) => {
    if (!listener) {
      return;
    }
    ee.removeListener(event, listener);
  };

  target.once = (event, listener) => {
    if (!listener) {
      return;
    }
    ee.once(event, listener);
  };

  target.emit = (...args) => {
    ee.emit(...args);
  };

  target.trigger = target.emit;
};

export default eventful;
