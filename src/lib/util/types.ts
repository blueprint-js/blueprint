import {
  Channel,
  Collection,
  DMChannel,
  GuildChannel,
  GuildEmoji,
  GuildMember,
  Snowflake,
  Speaking,
  TextChannel,
  User,
  Guild,
  Invite,
  Message,
  MessageReaction,
  Presence,
  Role,
  CloseEvent,
  VoiceState,
} from 'discord.js-light';

import {Blueprint} from '../class/client';
import {BaseConfig} from './config';

interface EventListeners<T, C extends BaseConfig> {
  (event: 'ready' | 'invalidated', listener: (ref: Blueprint<C>) => void): T;

  (
    event: 'channelCreate' | 'channelDelete',
    listener: (ref: Blueprint<C>, channel: DMChannel | GuildChannel) => void
  ): T;

  (
    event: 'channelPinsUpdate',
    listener: (
      ref: Blueprint<C>,
      channel: DMChannel | TextChannel,
      time: Date
    ) => void
  ): T;

  (
    event: 'channelUpdate',
    listener: (
      ref: Blueprint<C>,
      oldChannel: DMChannel | GuildChannel,
      newChannel: DMChannel | GuildChannel
    ) => void
  ): T;

  (event: 'debug', listener: (ref: Blueprint<C>, info: string) => void): T;

  (
    event: 'emojiCreate' | 'emojiDelete',
    listener: (ref: Blueprint<C>, emoji: GuildEmoji) => void
  ): T;

  (
    event: 'emojiUpdate',
    listener: (
      ref: Blueprint<C>,
      oldEmoji: GuildEmoji,
      newEmoji: GuildEmoji
    ) => void
  ): T;

  (
    event: 'guildBanAdd' | 'guildBanRemove',
    listener: (ref: Blueprint<C>, guild: Guild, user: User) => void
  ): T;

  (
    event:
      | 'guildCreate'
      | 'guildDelete'
      | 'guildIntegrationsUpdate'
      | 'guildUnavailable',
    listener: (ref: Blueprint<C>, guild: Guild) => void
  ): T;

  (
    event: 'guildMemberAdd' | 'guildMemberAvailable' | 'guildMemberRemove',
    listener: (ref: Blueprint<C>, member: GuildMember) => void
  ): T;

  (
    event: 'guildMembersChunk',
    listener: (
      ref: Blueprint<C>,
      members: Collection<Snowflake, GuildMember>,
      guild: Guild,
      chunk: Object
    ) => void
  ): T;

  (
    event: 'guildMemberSpeaking',
    listener: (ref: Blueprint<C>, speaking: Readonly<Speaking>) => void
  ): T;

  (
    event: 'guildMemberUpdate',
    listener: (
      ref: Blueprint<C>,
      oldMember: GuildMember,
      newMember: GuildMember
    ) => void
  ): T;

  (
    event: 'guildUpdate',
    listener: (ref: Blueprint<C>, oldGuild: Guild, newGuild: Guild) => void
  ): T;

  (
    event: 'inviteCreate' | 'inviteDelete',
    listener: (ref: Blueprint<C>, invite: Invite) => void
  ): T;

  (
    event: 'message' | 'messageDelete' | 'messageReactionRemoveAll',
    listener: (ref: Blueprint<C>, message: Message) => void
  ): T;

  (
    event: 'messageDeleteBulk',
    listener: (
      ref: Blueprint<C>,
      messages: Collection<Snowflake, Message>
    ) => void
  ): T;

  (
    event: 'messageReactionAdd' | 'messageReactionRemove',
    listener: (
      ref: Blueprint<C>,
      messageReaction: MessageReaction,
      user: User
    ) => void
  ): T;

  (
    event: 'messageReactionRemoveEmoji',
    listener: (ref: Blueprint<C>, reaction: MessageReaction) => void
  ): T;

  (
    event: 'messageUpdate',
    listener: (
      ref: Blueprint<C>,
      oldMessage: Message,
      newMessage: Message
    ) => void
  ): T;

  (
    event: 'presenceUpdate',
    listener: (
      ref: Blueprint<C>,
      oldPresence: Presence | null,
      newPresence: Presence
    ) => void
  ): T;

  (
    event: 'rateLimit',
    listener: (ref: Blueprint<C>, rateLimitInfo: Object) => void
  ): T;

  (
    event: 'roleCreate' | 'roleDelete',
    listener: (ref: Blueprint<C>, role: Role) => void
  ): T;

  (
    event: 'roleUpdate',
    listener: (ref: Blueprint<C>, oldRole: Role, newRole: Role) => void
  ): T;

  (
    event: 'typingStart',
    listener: (ref: Blueprint<C>, channel: Channel, user: User) => void
  ): T;

  (
    event: 'userUpdate',
    listener: (ref: Blueprint<C>, oldUser: User, newUser: User) => void
  ): T;

  (
    event: 'voiceStateUpdate',
    listener: (
      ref: Blueprint<C>,
      oldState: VoiceState,
      newState: VoiceState
    ) => void
  ): T;

  (event: 'warn', listener: (ref: Blueprint<C>, info: string) => void): T;

  (
    event: 'webhookUpdate',
    listener: (ref: Blueprint<C>, channel: TextChannel) => void
  ): T;

  (event: string, listener: (ref: Blueprint<C>, ...args: unknown[]) => void): T;
}

export interface ClientEvents<T, C extends BaseConfig>
  extends EventListeners<T, C> {
  (
    event: 'shardReady',
    listener: (
      ref: Blueprint<C>,
      id: number,
      unavailableGuilds: Set<string> | null
    ) => void
  ): T;

  (
    event: 'shardDisconnect',
    listener: (ref: Blueprint<C>, event: CloseEvent, id: number) => void
  ): T;

  (
    event: 'shardError',
    listener: (ref: Blueprint<C>, error: Error, shardID: number) => void
  ): T;

  (
    event: 'shardReconnecting',
    listener: (ref: Blueprint<C>, id: number) => void
  ): T;

  (
    event: 'shardResume',
    listener: (ref: Blueprint<C>, id: number, replayedEvents: number) => void
  ): T;
}
