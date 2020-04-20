import { EMessageId, EBusinessMessageId } from './config';

class Player {
  _uid;

  _container$;

  set uid(uid) {
    this._uid = uid;
  }

  get uid() {
    if (this._uid) {
      return this._uid;
    } else {
      throw new ReferenceError('this._uid is not defined.');
    }
  }

  set container$(container$) {
    this._container$ = container$;
  }

  get container$() {
    if (this._container$) {
      return this._container$;
    } else {
      throw new ReferenceError('this._container$ is not defined.');
    }
  }

  constructor(config) {
    const { uid, container } = config || {};
    this.uid = uid;
    if (container) {
      this.container$ = container;
    }
  }

  init(config) {
    const { container } = config || {};
    if (container) {
      this.container$ = container;
    }
    window.addEventListener('message', this.handleWndMessage);
  }

  dispose() {
    window.removeEventListener('message', this.handleWndMessage);
    this.container$ = null;
    this.uid = null;
  }

  handleWndMessage = (evt) => {
    const { data: evtData } = evt;
    const { messageId, _uuid, data } = evtData || {};

    if (_uuid !== this.uid) {
      return;
    }

    switch (messageId) {
      case EMessageId.DISPATCH_PLAYER_EVENT:
        alert(JSON.stringify(data));
        break;
      default:
        break;
    }
  };

  play = () => {
    this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_PLAY);
  };

  pause = () => {
    this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_PAUSE);
  };

  getState = () => {
    this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_GET_PLAYER_STATE);
  };

  sendBizMsg(messageId, data) {
    this._send('biz_msg', {
      messageId,
      data,
    });
  }

  _send(type, data) {
    const otherWindow = this.container$.contentWindow;
    if (otherWindow && typeof otherWindow.postMessage === 'function') {
      otherWindow.postMessage(
        {
          ...data,
          type,
          _uuid: this.uid,
        },
        '*'
      );
    }
  }
}

export default Player;
