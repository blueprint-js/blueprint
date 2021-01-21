enum Permissions {
  createInstantInvite = 1,
  kickMembers = 2,
  banMembers = 4,
  administrator = 8,
  manageChannels = 16,
  manageGuild = 32,
  addReactions = 64,
  viewAuditLogs = 128,
  voicePrioritySpeaker = 256,
  stream = 512,
  readMessages = 1024,
  sendMessages = 2048,
  sendTTSMessages = 4096,
  manageMessages = 8192,
  embedLinks = 16384,
  attachFiles = 32768,
  readMessageHistory = 65536,
  mentionEveryone = 131072,
  externalEmojis = 262144,
  viewGuildInsights = 524288,
  voiceConnect = 1048576,
  voiceSpeak = 2097152,
  voiceMuteMembers = 4194304,
  voiceDeafenMembers = 8388608,
  voiceMoveMembers = 16777216,
  voiceUseVAD = 33554432,
  changeNickname = 67108864,
  manageNicknames = 134217728,
  manageRoles = 268435456,
  manageWebhooks = 546870912,
  manageEmojis = 1973741824,
  all = 2147483647,
  allGuild = 2080899263,
  allText = 805829714,
  allVoice = 871367441,
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
  if (Object.keys(erisPermissionMap).includes(key))
    return erisPermissionMap[key as keyof typeof erisPermissionMap];
  else return Permissions[key as keyof typeof Permissions];
}

const erisPermissionMap = {
  'invite.create': Permissions.createInstantInvite,
  'members.kick': Permissions.kickMembers,
  'members.ban': Permissions.banMembers,
  'guild.administrator': Permissions.banMembers,
  'channels.manage': Permissions.manageChannels,
  'reactions.add': Permissions.addReactions,
  'auditlogs.view': Permissions.viewAuditLogs,
  'voice.priority': Permissions.voicePrioritySpeaker,
  'voice.stream': Permissions.stream,
  'messages.read': Permissions.readMessages,
  'messages.send': Permissions.sendMessages,
  'messages.send.tts': Permissions.sendTTSMessages,
  'messages.manage': Permissions.manageMessages,
  'messages.links': Permissions.embedLinks,
  'messages.files': Permissions.attachFiles,
  'messages.read.history': Permissions.readMessageHistory,
  'messages.mention': Permissions.mentionEveryone,
  'emojis.external': Permissions.externalEmojis,
  'guild.insights': Permissions.viewGuildInsights,
  'voice.connect': Permissions.voiceConnect,
  'voice.speak': Permissions.voiceSpeak,
  'voice.manage.mute': Permissions.voiceMuteMembers,
  'voice.manage.deafen': Permissions.voiceDeafenMembers,
  'voice.manage.move': Permissions.voiceMoveMembers,
  'voice.vad': Permissions.voiceUseVAD,
  'nicks.change': Permissions.changeNickname,
  'nicks.manage': Permissions.manageNicknames,
  'roles.manage': Permissions.manageRoles,
  'webhooks.manage': Permissions.manageWebhooks,
  'emojis.manage': Permissions.manageEmojis,
  'guild.manage': Permissions.manageGuild,
};
