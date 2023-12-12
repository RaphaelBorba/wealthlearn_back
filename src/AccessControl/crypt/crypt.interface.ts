export interface Crypt {
  hash(password: string): string;
  compareHash(hash: string, password: string): boolean;
}
