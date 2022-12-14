/**
 * Exclude field from User entity that
 *  don't want to be sent to the client
 */

export function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
