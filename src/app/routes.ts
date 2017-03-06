import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Main, NotesContainer, About, Auth } from './containers';
import { AuthService } from './services'

export const routes: ModuleWithProviders = RouterModule.forRoot([
    {
        path: '',
        component: Main,
        canActivate: [AuthService],
        children: [
            {
                path: '',
                component: NotesContainer
            },
            {
                path: 'about',
                component: About
            }
        ]
    },
    {
        path: 'auth',
        component: Auth
    },
    {
        path: '**',
        redirectTo: ''
    }
]);