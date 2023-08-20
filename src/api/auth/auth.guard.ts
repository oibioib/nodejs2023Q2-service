import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppUnauthorizedException } from './auth.exceptions';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const [bearer, token] = request.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) throw new Error();

      const isTokenValid = this.tokenService.isTokenValid(token);

      return isTokenValid;
    } catch (error) {
      throw new AppUnauthorizedException();
    }
  }
}
