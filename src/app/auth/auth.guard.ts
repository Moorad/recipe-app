import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const canActivateAuth: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      const userExists = !!user;
      if (userExists) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
  );
};
