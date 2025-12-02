import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/components/landing-page';
export const routes: Routes = [
    {path:'', component : LandingPage},
    {path: 'facesnaps', loadChildren : () => import('./face-snaps/face-snaps-module').then( m => m.FaceSnapsModule) },
    {path: 'auth', loadChildren : () => import('./auth/auth-routing.module').then( m => m.AuthRoutingModule) }
];
