import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { UserGuard } from './services/user.guard';

const appRoutes: Routes = [
	{path: 'registro', component: RegisterComponent},
	{path: 'login', component: LoginComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);