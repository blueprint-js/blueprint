import {Registry} from '../class/registry';
import {convertPermission, PermissionString} from '../util/permissions';
import {Member, User} from 'eris';

interface Override {
  type: 'user' | 'role';
  id: string;
}

interface Group {
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
    this.items.set('developer', {
      permissions: [],
      overrides: developers.map(id => ({type: 'user', id})),
    });
  }

  /**
   * Registers a new permission group
   * @param key The name of the permission group
   * @param value The group definition
   */
  register(key: string, value: Group): void {
    if (key === 'developer') return;
    this.items.set(key, value);
  }

  /**
   * Unregisters an existing permission group
   * @param key The name of the permission group
   */
  unregister(key: string): void {
    if (key === 'developer') return;
    if (this.items.has(key)) this.items.delete(key);
  }

  /**
   * Returns the groups a user belongs to
   * @param user The user to check groups of
   */
  check(user: User | Member): Array<string> {
    const groups = [];
    if (user instanceof User) return [];
    const userPermissions = Object.entries((user as Member).permissions.json)
      .filter(p => p[1])
      .map(p => convertPermission(p[0] as PermissionString));
    for (const [key, {permissions, overrides}] of this.items) {
      if (hasOverrides(user, overrides)) groups.push(key);
      else if (
        permissions.length > 0 &&
        permissions.every(p => userPermissions.includes(convertPermission(p)))
      )
        groups.push(key);
    }
    return groups;
  }
}
