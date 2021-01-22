import {mapPermission, PermissionString} from '../util/permissions';
import {Registry} from '../class/registry';
import {Member, User} from 'eris';

export interface Override {
  type: 'user' | 'role';
  id: string;
}

export interface Group {
  inherits?: Array<string>;
  permissions: Array<PermissionString>;
  overrides?: Array<Override>;
}

function hasOverrides(
  user: Member,
  overrides: Array<Override> | undefined
): boolean {
  if (!overrides) return false;
  if (overrides.find(o => o.type === 'user' && o.id === user.id)) return true;
  else
    return !!overrides.find(
      o => o.type === 'role' && user.roles.includes(o.id)
    );
}

export class GroupRegistry extends Registry<Group> {
  constructor(developers: Array<string>) {
    super();
    this.items.push({
      key: 'developer',
      value: {
        permissions: [],
        overrides: developers.map(id => ({type: 'user', id})),
      },
    });
  }

  /**
   * Registers a new permission group
   * @param key The name of the permission group
   * @param value The group definition
   */
  register(key: string, value: Group): void {
    if (key === 'developer') return;
    if (value.inherits && value.inherits.length > 0) {
      const gs = value.inherits.map(
        gn => this.items.find(v => v.key === gn)?.value as Group
      );
      for (const g of gs) {
        value.permissions = value.permissions.concat(g.permissions);
        if (g.overrides) {
          if (value.overrides)
            value.overrides = value.overrides.concat(g.overrides);
        } else value.overrides = g.overrides;
      }
      delete value.inherits;
    }
    this.items.push({key, value});
  }

  /**
   * Unregisters an existing permission group
   * @param key The name of the permission group
   */
  unregister(key: string): void {
    const vk = this.items.findIndex(v => v.key === key);
    if (vk > 0) this.items.splice(vk, 1);
  }

  /**
   * Validates if a user has the required groups
   * @param user The user to check groups of
   * @param cmdGroups The command's groups
   */
  validate(user: User | Member, cmdGroups: Array<string>): boolean {
    const groups: Array<string> = [];
    if (user instanceof User) return false;
    const userPermissions = Object.entries((user as Member).permissions.json)
      .filter(p => p[1])
      .map(p => mapPermission(p[0]));
    for (const {
      key,
      value: {permissions, overrides},
    } of this.items) {
      if (hasOverrides(user, overrides)) groups.push(key);
      else if (
        permissions.length > 0 &&
        permissions.every(p => userPermissions.includes(mapPermission(p)))
      )
        groups.push(key);
    }
    return cmdGroups.some(g => groups.includes(g));
  }
}
