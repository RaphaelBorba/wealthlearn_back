import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Crypt } from './crypt.interface';

@Injectable()
export class CryptService implements Crypt {
  hash(password: string) {
    const saltNumber = 8;
    const hashedPassword = bcrypt.hashSync(password, saltNumber);
    return hashedPassword;
  }

  compareHash(hash: string, password: string) {
    return bcrypt.compareSync(password, hash);
  }
}
