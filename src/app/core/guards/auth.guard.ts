import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../services"

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log("AuthGuard check", authService.isLoggedIn());

    if (authService.isLoggedIn()) {
        return true;
    } else {
        console.warn('Not authenticated. Redirecting...');
        return router.createUrlTree(['/login'])
    }
}
