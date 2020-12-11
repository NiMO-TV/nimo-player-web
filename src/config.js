const EMessageId = {
  DISPATCH_PLAYER_EVENT: 10001, // Dispatch player events (eg: ended)
};

const EBusinessMessageId = {
  INVOKE_PLAYER_PLAY: 3001, // Player
  INVOKE_PLAYER_PAUSE: 3002, // Pause
  INVOKE_PLAYER_GET_PLAYER_STATE: 3003, // Get Player State
  INVOKE_PLAYER_MUTE: 3004, // Mute
};

const TrustedOrigin = ['https://www.nimo.tv', 'https://m.nimo.tv'];

export { EMessageId, EBusinessMessageId, TrustedOrigin };
