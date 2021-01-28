# Permissions

This page will go into detail about what each permission string is for,
note that you don't necessarily need to know what each string is, as the `Group` interface
already contains the `PermissionString` type which gives you the intellisense needed if you
use an IDE such as Visual Studio Code, or WebStorm.

## List Of Permssions

Below you can see a table of all the permission strings that you are given access to
when creating groups, note that in future updates more could be added, removed, or changed.

key | description
----|------------
`invite.create` | user can create instant invites to the guild
`members.kick` | user can kick members from the guild
`members.ban` | user can ban members from the guild
`guild.administrator` | user has administrator permissions on the guild
`channels.manage` | user can manage the the guild
`reactions.add` | user can add reactions to messages
`auditlogs.view` | user can view the audit logs of the guild
`voice.priority` | user has voice priority permissions
`voice.stream` | user can use video streaming in the guild
`messages.read` | user can read messages in the guild
`messages.send` | user can send messages in the guild
`messages.send.tts` | user can send tts messages in the guild
`messages.manage` | user can manage or delete messages in the guild
`messages.links` | user can embed links in messages in the guild
`messages.files` | user can upload files in the guild
`messages.read.history` | user can read message history in the guild
`messages.mention` | user can mention everyone or roles in the guild
`emojis.external` | user can use external emojis in the guild
`guild.insights` | user has access to the current guild's insights
`voice.connect` | user can connect to voice channels in the guild
`voice.speak` | user can speak in voice channels in the guild
`voice.manage.mute` | user can mute members inside of voice channels
`voice.manage.deafen` | user can deafen members inside of voice channels
`voice.manage.move` | user can move members in voice channels
`voice.vad` | user can use voice activity in voice channels
`nicks.change` | user can change their own nickname
`nicks.manage` | user can manage other people's nicknames
`roles.manage` | user can manage roles in the guild
`webhooks.manage` | user can manage webhooks in the guild
`emojis.manage` | user can manage emojis in the guild
`guild.manage` | user can manage the guild
