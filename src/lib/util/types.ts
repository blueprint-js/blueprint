import {
  Call,
  OldCall,
  TextableChannel,
  GroupChannel,
  User,
  OldGuildChannel,
  OldGroupChannel,
  FriendSuggestionReasons,
  Guild,
  PossiblyUncachedGuild,
  Emoji,
  Member,
  MemberPartial,
  Role,
  OldRole,
  UnavailableGuild,
  OldGuild,
  Invite,
  InviteWithMetadata,
  Message,
  PossiblyUncachedMessage,
  PartialEmoji,
  OldMessage,
  Relationship,
  Presence,
  RawRESTRequest,
  RawPacket,
  PartialUser,
  VoiceChannel,
  OldVoiceState,
  WebhookData,
  AnyChannel,
} from 'eris';
import {Blueprint} from '../..';

interface EventListeners<T> {
  (event: 'ready' | 'disconnect', listener: (ref: Blueprint) => void): T;
  (
    event: 'callCreate' | 'callRing' | 'callDelete',
    listener: (ref: Blueprint, call: Call) => void
  ): T;
  (
    event: 'callUpdate',
    listener: (ref: Blueprint, call: Call, oldCall: OldCall) => void
  ): T;
  (
    event: 'channelCreate' | 'channelDelete',
    listener: (ref: Blueprint, channel: AnyChannel) => void
  ): T;
  (
    event: 'channelPinUpdate',
    listener: (
      ref: Blueprint,
      channel: TextableChannel,
      timestamp: number,
      oldTimestamp: number
    ) => void
  ): T;
  (
    event: 'channelRecipientAdd' | 'channelRecipientRemove',
    listener: (ref: Blueprint, channel: GroupChannel, user: User) => void
  ): T;
  (
    event: 'channelUpdate',
    listener: (
      ref: Blueprint,
      channel: AnyChannel,
      oldChannel: OldGuildChannel | OldGroupChannel
    ) => void
  ): T;
  (
    event: 'connect' | 'shardPreReady',
    listener: (ref: Blueprint, id: number) => void
  ): T;
  (
    event: 'friendSuggestionCreate',
    listener: (
      ref: Blueprint,
      user: User,
      reasons: FriendSuggestionReasons
    ) => void
  ): T;
  (
    event: 'friendSuggestionDelete',
    listener: (ref: Blueprint, user: User) => void
  ): T;
  (
    event: 'guildBanAdd' | 'guildBanRemove',
    listener: (ref: Blueprint, guild: Guild, user: User) => void
  ): T;
  (
    event: 'guildAvailable' | 'guildCreate',
    listener: (ref: Blueprint, guild: Guild) => void
  ): T;
  (
    event: 'guildDelete',
    listener: (ref: Blueprint, guild: PossiblyUncachedGuild) => void
  ): T;
  (
    event: 'guildEmojisUpdate',
    listener: (
      ref: Blueprint,
      guild: Guild,
      emojis: Emoji[],
      oldEmojis: Emoji[]
    ) => void
  ): T;
  (
    event: 'guildMemberAdd',
    listener: (ref: Blueprint, guild: Guild, member: Member) => void
  ): T;
  (
    event: 'guildMemberChunk',
    listener: (ref: Blueprint, guild: Guild, members: Member[]) => void
  ): T;
  (
    event: 'guildMemberRemove',
    listener: (
      ref: Blueprint,
      guild: Guild,
      member: Member | MemberPartial
    ) => void
  ): T;
  (
    event: 'guildMemberUpdate',
    listener: (
      ref: Blueprint,
      guild: Guild,
      member: Member,
      oldMember: {nick?: string; premiumSince: number; roles: string[]} | null
    ) => void
  ): T;
  (
    event: 'guildRoleCreate' | 'guildRoleDelete',
    listener: (ref: Blueprint, guild: Guild, role: Role) => void
  ): T;
  (
    event: 'guildRoleUpdate',
    listener: (
      ref: Blueprint,
      guild: Guild,
      role: Role,
      oldRole: OldRole
    ) => void
  ): T;
  (
    event: 'guildUnavailable' | 'unavailableGuildCreate',
    listener: (ref: Blueprint, guild: UnavailableGuild) => void
  ): T;
  (
    event: 'guildUpdate',
    listener: (ref: Blueprint, guild: Guild, oldGuild: OldGuild) => void
  ): T;
  (
    event: 'hello',
    listener: (ref: Blueprint, trace: string[], id: number) => void
  ): T;
  (
    event: 'inviteCreate' | 'inviteDelete',
    listener: (
      ref: Blueprint,
      guild: Guild,
      invite: Invite & InviteWithMetadata
    ) => void
  ): T;
  (
    event: 'messageCreate',
    listener: (ref: Blueprint, message: Message) => void
  ): T;
  (
    event: 'messageDelete' | 'messageReactionRemoveAll',
    listener: (ref: Blueprint, message: PossiblyUncachedMessage) => void
  ): T;
  (
    event: 'messageReactionRemoveEmoji',
    listener: (
      ref: Blueprint,
      message: PossiblyUncachedMessage,
      emoji: PartialEmoji
    ) => void
  ): T;
  (
    event: 'messageDeleteBulk',
    listener: (ref: Blueprint, messages: PossiblyUncachedMessage[]) => void
  ): T;
  (
    event: 'messageReactionAdd',
    listener: (
      ref: Blueprint,
      message: PossiblyUncachedMessage,
      emoji: Emoji,
      reactor: Member | {id: string}
    ) => void
  ): T;
  (
    event: 'messageReactionRemove',
    listener: (
      ref: Blueprint,
      message: PossiblyUncachedMessage,
      emoji: PartialEmoji,
      userID: string
    ) => void
  ): T;
  (
    event: 'messageUpdate',
    listener: (
      ref: Blueprint,
      message: Message,
      oldMessage: OldMessage | null
    ) => void
  ): T;
  (
    event: 'presenceUpdate',
    listener: (
      ref: Blueprint,
      other: Member | Relationship,
      oldPresence: Presence | null
    ) => void
  ): T;
  (
    event: 'rawREST',
    listener: (ref: Blueprint, request: RawRESTRequest) => void
  ): T;
  (
    event: 'rawWS' | 'unknown',
    listener: (ref: Blueprint, packet: RawPacket, id: number) => void
  ): T;
  (
    event: 'relationshipAdd' | 'relationshipRemove',
    listener: (ref: Blueprint, relationship: Relationship) => void
  ): T;
  (
    event: 'relationshipUpdate',
    listener: (
      ref: Blueprint,
      relationship: Relationship,
      oldRelationship: {type: number}
    ) => void
  ): T;
  (
    event: 'typingStart',
    listener: (
      ref: Blueprint,
      channel: TextableChannel | {id: string},
      user: User | {id: string}
    ) => void
  ): T;
  (
    event: 'userUpdate',
    listener: (ref: Blueprint, user: User, oldUser: PartialUser | null) => void
  ): T;
  (
    event: 'voiceChannelJoin',
    listener: (ref: Blueprint, member: Member, newChannel: VoiceChannel) => void
  ): T;
  (
    event: 'voiceChannelLeave',
    listener: (ref: Blueprint, member: Member, oldChannel: VoiceChannel) => void
  ): T;
  (
    event: 'voiceChannelSwitch',
    listener: (
      ref: Blueprint,
      member: Member,
      newChannel: VoiceChannel,
      oldChannel: VoiceChannel
    ) => void
  ): T;
  (
    event: 'voiceStateUpdate',
    listener: (ref: Blueprint, member: Member, oldState: OldVoiceState) => void
  ): T;
  (
    event: 'warn' | 'debug',
    listener: (ref: Blueprint, message: string, id: number) => void
  ): T;
  (
    event: 'webhooksUpdate',
    listener: (ref: Blueprint, data: WebhookData) => void
  ): T;
  (event: string, listener: (ref: Blueprint, ...args: unknown[]) => void): T;
}

export interface ClientEvents<T> extends EventListeners<T> {
  (
    event: 'shardReady' | 'shardResume',
    listener: (ref: Blueprint, id: number) => void
  ): T;
  (
    event: 'shardDisconnect' | 'error',
    listener: (ref: Blueprint, err: Error, id: number) => void
  ): T;
}
