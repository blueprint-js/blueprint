enum Permissions {
  CREATE_INSTANT_INVITE = 1,
  KICK_MEMBERS = 2,
  BAN_MEMBERS = 4,
  ADMINISTRATOR = 8,
  MANAGE_CHANNELS = 16,
  MANAGE_GUILD = 32,
  ADD_REACTIONS = 64,
  VIEW_AUDIT_LOG = 128,
  PRIORITY_SPEAKER = 256,
  STREAM = 512,
  VIEW_CHANNEL = 1024,
  SEND_MESSAGES = 2048,
  SEND_TTS_MESSAGES = 4096,
  MANAGE_MESSAGES = 8192,
  EMBED_LINKS = 16384,
  ATTACH_FILES = 32768,
  READ_MESSAGE_HISTORY = 65536,
  MENTION_EVERYONE = 131072,
  USE_EXTERNAL_EMOJIS = 262144,
  VIEW_GUILD_INSIGHTS = 524288,
  CONNECT = 1048576,
  SPEAK = 2097152,
  MUTE_MEMBERS = 4194304,
  DEAFEN_MEMBERS = 8388608,
  MOVE_MEMBERS = 16777216,
  USE_VAD = 33554432,
  CHANGE_NICKNAME = 67108864,
  MANAGE_NICKNAMES = 134217728,
  MANAGE_ROLES = 268435456,
  MANAGE_WEBHOOKS = 546870912,
  MANAGE_EMOJIS = 1973741824,
  ALL = 2147483647,
  ALL_GUILD = 2080899263,
  ALL_TEXT = 805829714,
  ALL_VOICE = 871367441,
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

export function mapPermission(key: string | PermissionString): Permissions {
  if (Object.keys(djsPermissionMap).includes(key))
    return djsPermissionMap[key as keyof typeof djsPermissionMap];
  else return Permissions[key as keyof typeof Permissions];
}

const djsPermissionMap = {
  'invite.create': Permissions.CREATE_INSTANT_INVITE,
  'members.kick': Permissions.KICK_MEMBERS,
  'members.ban': Permissions.BAN_MEMBERS,
  'guild.administrator': Permissions.ADMINISTRATOR,
  'channels.manage': Permissions.MANAGE_CHANNELS,
  'reactions.add': Permissions.ADD_REACTIONS,
  'auditlogs.view': Permissions.VIEW_AUDIT_LOG,
  'voice.priority': Permissions.PRIORITY_SPEAKER,
  'voice.stream': Permissions.STREAM,
  'messages.read': Permissions.READ_MESSAGE_HISTORY,
  'messages.send': Permissions.SEND_MESSAGES,
  'messages.send.tts': Permissions.SEND_TTS_MESSAGES,
  'messages.manage': Permissions.MANAGE_MESSAGES,
  'messages.links': Permissions.EMBED_LINKS,
  'messages.files': Permissions.ATTACH_FILES,
  'messages.read.history': Permissions.READ_MESSAGE_HISTORY,
  'messages.mention': Permissions.MENTION_EVERYONE,
  'emojis.external': Permissions.USE_EXTERNAL_EMOJIS,
  'guild.insights': Permissions.VIEW_GUILD_INSIGHTS,
  'voice.connect': Permissions.CONNECT,
  'voice.speak': Permissions.SPEAK,
  'voice.manage.mute': Permissions.MUTE_MEMBERS,
  'voice.manage.deafen': Permissions.DEAFEN_MEMBERS,
  'voice.manage.move': Permissions.MOVE_MEMBERS,
  'voice.vad': Permissions.USE_VAD,
  'nicks.change': Permissions.CHANGE_NICKNAME,
  'nicks.manage': Permissions.MANAGE_NICKNAMES,
  'roles.manage': Permissions.MANAGE_ROLES,
  'webhooks.manage': Permissions.MANAGE_WEBHOOKS,
  'emojis.manage': Permissions.MANAGE_EMOJIS,
  'guild.manage': Permissions.MANAGE_GUILD,
};
