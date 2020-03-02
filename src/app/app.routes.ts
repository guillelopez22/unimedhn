import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './app.loginguard';

// *******************************************************************************
// Layouts

import { LayoutComponent } from './layout/layout/layout.component';

// *******************************************************************************
// Pages

import { FirstLoginComponent } from './first_login/first_login.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover_password/recover_password.component';
import { NotFoundComponent } from './not_found/not_found.component';
import { HomeComponent } from './home/home.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';

// *******************************************************************************
// Routes

const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/conectarse', 
        pathMatch: 'full' 
    },
    { 
        path: 'conectarse', 
        component: LoginComponent 
    },
    { 
        path: 'recuperar', 
        component: RecoverPasswordComponent 
    },
    { 
        path: 'cambiar_contraseña_primera_vez', 
        component: FirstLoginComponent 
    },
    { 
        path: '404', 
        component: NotFoundComponent 
    },
    { 
        path: 'plataforma', 
        component: LayoutComponent,
        children: [
            { 
                path: '', 
                redirectTo: 'inicio', 
                pathMatch: 'full'
            },
            { 
                path: 'inicio', 
                component: HomeComponent,
                canActivate:[LoginGuard]
            },
            { 
                path: 'instituciones', 
                component: InstitucionesComponent,
                canActivate:[LoginGuard]
            }
        ]
    },
    { 
        path: '**', 
        redirectTo: '/404', 
        pathMatch: 'full'
    }
];

// *******************************************************************************
//

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
