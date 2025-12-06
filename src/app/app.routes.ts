import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { ThemeContent } from './features/themes/theme-content/theme-content';
import { AuthGuard } from './core/guards';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    }
    ,
    {
        path: 'artists',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/artist-board/theme-board').then(c => c.ArtistBoard)
    },
    {
        path: 'songs/:artistId',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/theme-board/theme-board').then(c => c.ThemeBoard)
    },
    {
        path: 'songs2/:artistId',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/song2-board/theme-board').then(c => c.ThemeBoard2)
    }, {
        path: 'songs',
        redirectTo: 'songs/27',
        pathMatch: 'full'
    },
    {
        path: 'songs2',
        redirectTo: 'songs2/9',
        pathMatch: 'full'
    }

    ,
    {
        path: 'change-song',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/new-theme/new-theme').then(c => c.NewTheme)
    },
    {
        path: 'change-song2',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/new-song2/new-theme').then(c => c.NewTheme2)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'radio',
        // canActivate: [AuthGuard],
        loadComponent: () => import('./features/themes/radio-board/radio-board').then(c => c.RadioBoard)
    },
    {
        path: 'test',
        // canActivate: [AuthGuard],
        loadComponent: () => import('./tests/test/test').then(c => c.TestComponent)
    },
    {
        path: 'hottest1',
        // canActivate: [AuthGuard],
        loadComponent: () => import('./tests/hottest1/hottest1').then(c => c.Hottest1)
    },
    {
        path: 'promise',
        // canActivate: [AuthGuard],
        loadComponent: () => import('./tests/promise1/promise1').then(c => c.Promise1)
    },
    {
        path: 'not-found',
        component: NotFound //
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }


];
