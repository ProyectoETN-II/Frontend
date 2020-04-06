import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { RegisterComponent } from './components/register/register.component';


import { UserGuard } from './services/user.guard';

const appRoutes: Routes = [
	{path: 'registro', component: RegisterComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);