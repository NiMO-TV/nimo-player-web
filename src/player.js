import { EMessageId, EBusinessMessageId } from './config';
import eventful from './eventful';
import { addUrlParams } from './util';

class Player {
  _containerId;

  _container$;

  set containerId(containerId) {
    this._containerId = containerId;
  }

  get containerId() {
    if (this._containerId) {
      return this._containerId;
    } else {
      throw new ReferenceError('this._containerId is not defined.');
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

  static ENDED = 'ended';

  static STATE = 'getPlayerState';

  static PLAY = 'playing'; // 抹平状态名称差异

  static PAUSED = 'paused';

  targetOrigin = 'https://www.nimo.tv';

  constructor(containerId, config) {
    eventful(this);
    this.containerId = containerId;
    this.container$ = document.getElementById(this.containerId);
    this.player$ = this._createPlayer(config);
    this.container$.appendChild(this.player$);
    this.init();
  }

  init() {
    window.addEventListener('message', this.handleWndMessage);
  }

  dispose() {
    window.removeEventListener('message', this.handleWndMessage);
    this.player$ = null;
    this.container$ = null;
    this.containerId = null;
  }

  handleWndMessage = (evt) => {
    const { data: evtData } = evt;
    const { messageId, _uuid, data: config } = evtData || {};

    if (_uuid !== this.containerId) {
      return;
    }

    if (messageId === EMessageId.DISPATCH_PLAYER_EVENT) {
      const { eventType, data } = config || {};
      this.emit(eventType, data);
    }
  };

  play = () => {
    this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_PLAY);
  };

  pause = () => {
    this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_PAUSE);
  };

  destroy = () => {
    if (this.player$ && this.player$.parentNode) {
      this.player$.parentNode.removeChild(this.player$);
    }
  }

  getState = () => {
    return new Promise((resolve, reject) => {
      const handler = (data) => {
        resolve(data);
        this.off(Player.STATE, handler);
      };
      this.on(Player.STATE, handler);
      this.sendBizMsg(EBusinessMessageId.INVOKE_PLAYER_GET_PLAYER_STATE);
    });
  };

  sendBizMsg(messageId, data) {
    this._send('biz_msg', {
      messageId,
      data,
    });
  }

  _send(type, data) {
    const otherWindow = this.player$.contentWindow;
    if (otherWindow && typeof otherWindow.postMessage === 'function') {
      otherWindow.postMessage(
        {
          ...data,
          type,
          _uuid: this.containerId,
        },
        this.targetOrigin
      );
    }
  }

  _createPlayer(config) {
    const { width, height, resourceId, lang } = config || {};
    const player$ = document.createElement('iframe');
    player$.setAttribute(
      'src',
      this._getUrl(resourceId, {
        _lang: lang,
      })
    );
    player$.setAttribute('width', width);
    player$.setAttribute('height', height);
    player$.setAttribute('frameborder', 0);
    player$.setAttribute('scrolling', 0);
    player$.setAttribute('allow', 'fullscreen');
    player$.setAttribute('allowfullscreen', true);
    return player$;
  }

  _getUrl(resourceId, queryParams) {
    let url = `${this.targetOrigin}/embed/${resourceId}`;
    const params = {
      ...queryParams,
      _uuid: this.containerId,
    };
    url = addUrlParams(url, params);
    return url;
  }
}

export default Player;
