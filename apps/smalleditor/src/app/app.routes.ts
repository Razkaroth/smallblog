import { Route, Router } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { inject } from '@angular/core';
import { TrpcService } from './trpc.service';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    /**
     * This route is protected by the AuthGuard and only allows access to users that are logged in and are admins.
     * MainComponent acts as a route wrapper and will render the MainComponent and its children.
     * Every route that is a child of MainComponent will be protected by the AuthGuard.
     **/
    path: '',
    component: MainComponent,
    canActivate: [
      //AuthGuard
      () => {
        // get the trpc service and router
        const trpc = inject(TrpcService);
        const router = inject(Router);
        // if user is not logged in, redirect to login
        if (!trpc.user) {
          router.navigate(['/login']);
          return false;
        }
        // if user is logged in, allow access if user is admin
        return trpc.user?.isAdmin;
      },
    ],
  },

  // otherwise redirect to home
  {
    path: '**',
    redirectTo: '',
  },
];
