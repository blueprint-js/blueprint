enum Permissions {
  'invite.create' = 1,
  'members.kick' = 2,
  'members.ban' = 4,
  'guild.administrator' = 8,
  'channels.manage' = 16,
  'guild.manage' = 32,
  'reactions.add' = 64,
  'auditlogs.view' = 128,
  'voice.priority' = 256,
  'voice.stream' = 512,
  'messages.read' = 1024,
  'messages.send' = 2048,
  'messages.send.tts' = 4096,
  'messages.manage' = 8192,
  'messages.links' = 16384,
  'messages.files' = 32768,
  'messages.read.history' = 65536,
  'messages.mention' = 131072,
  'emojis.external' = 262144,
  'guild.insights' = 524288,
  'voice.connect' = 1048576,
  'voice.speak' = 2097152,
  'voice.manage.mute' = 4194304,
  'voice.manage.deafen' = 8388608,
  'voice.manage.move' = 16777216,
  'voice.vad' = 33554432,
  'nicks.change' = 67108864,
  'nicks.manage' = 134217728,
  'roles.manage' = 268435456,
  'webhooks.manage' = 546870912,
  'emojis.manage' = 1973741824,
}

export type PermissionString =
  | 'invite.create'
  | 'members.kick'
  | 'members.ban'
  | 'guild.administrator'
  | 'channels.manage'
  | 'reactions.add'
  | 'auditlogs.view'
  | 'voice.priority'
  | 'voice.stream'
  | 'messages.read'
  | 'messages.send'
  | 'messages.send.tts'
  | 'messages.manage'
  | 'messages.links'
  | 'messages.files'
  | 'messages.read.history'
  | 'messages.mention'
  | 'emojis.external'
  | 'guild.insights'
  | 'voice.connect'
  | 'voice.speak'
  | 'voice.manage.mute'
  | 'voice.manage.deafen'
  | 'voice.manage.move'
  | 'voice.vad'
  | 'nicks.change'
  | 'nicks.manage'
  | 'roles.manage'
  | 'webhooks.manage'
  | 'emojis.manage'
  | 'guild.manage';

export function convertPermission(key: PermissionString) {
  return Permissions[key as keyof typeof Permissions];
}
