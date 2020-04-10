export const MESSAGE_TYPE = Object.freeze({
  TEXT: 'text',
  STICKER: 'sticker'
});

export const MESSAGES = Object.freeze({
  "message.converted.rate": "目前的國際匯率為: ${before} ${base} = ${after} ${target}",
  "message.system.error": "系統錯誤，請稍後再嘗試",
  "message.system.invalid.input": "不好意思，輸入格式錯誤，請重新輸入"
});

export const RESERVED_MESSAGES_CODES = Object.freeze([
  "<CUR>", "<HELP>"
]);
