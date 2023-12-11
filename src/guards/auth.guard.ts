import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

export const AuthGuard = (isAdmin?: boolean) => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    admin: boolean;
    constructor(
      readonly authService: AuthService,
      readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      const token = (authorization ?? '').split(' ')[1];
      if (!token) throw new BadRequestException('Token não enviado');

      try {
        const data = await this.authService.checkToken(token);

        const user = await this.userService.findOne(Number(data.id));
        if (!user) {
          throw new ForbiddenException('Token Invalido!');
        }
        request.user = user;
        if (isAdmin) {
          if (user.user_access_id === 1) {
            return true;
          } else {
            throw new ForbiddenException('Rota de Admin');
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  const guard = mixin(AuthGuardMixin);
  return guard;
};
