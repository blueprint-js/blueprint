import {Registry} from './registry';
import {Permissions, convertPermission} from './permissions';
import {Member, User} from 'eris';

interface Override {
  type: 'user' | 'role';
  id: string;
}

interface Group {
  permissions: Array<Permissions>;
  overrides?: Array<Override>;
}

function hasOverrides(
  user: Member,
  overrides: Array<Override> | undefined
): boolean {
  if (!overrides) return false;
  if (overrides.find(o => o.type === 'user' && o.id === user.id)) return true;
  else if (overrides.find(o => o.type === 'role' && user.roles.includes(o.id)))
    return true;
  else return false;
}

export class GroupRegistry extends Registry<Group> {
  /**
   * Registers a new permission group
   * @param key The name of the permission group
   * @param value The group definition
   */
  register(key: string, value: Group): void {
    this.items.set(key, value);
  }
  /**
   * Unregisters an existing permission group
   * @param key The name of the permission group
   */
  unregister(key: string): void {
    if (this.items.has(key)) this.items.delete(key);
  }
  /**
   * Returns the groups a user belongs to
   * @param user The user to check groups of
   */
  check(user: User | Member): Array<string> {
    const groups = [];
    if (user instanceof User) return [];
    const uperms = Object.entries((user as Member).permissions.json)
      .filter(p => p[1] === true)
      .map(p => convertPermission(p[0]));
    for (const [key, {permissions, overrides}] of this.items) {
      if (hasOverrides(user, overrides)) groups.push(key);
      else if (permissions.every(p => uperms.includes(p))) groups.push(key);
    }
    return groups;
  }
}
