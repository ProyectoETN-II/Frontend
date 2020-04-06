import { RouterModule } from '@angular/router';
// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';
import { UserGuard } from './services/user.guard';
const appRoutes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'mis-datos', component: UserEditComponent, canActivate: [UserGuard] },
    { path: 'gente', component: UsersComponent, canActivate: [UserGuard] },
    { path: 'gente/:page', component: UsersComponent, canActivate: [UserGuard] },
    { path: 'publicaciones', component: TimelineComponent, canActivate: [UserGuard] },
    { path: 'perfil/:id', component: ProfileComponent, canActivate: [UserGuard] },
    { path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate: [UserGuard] },
    { path: 'seguidores/:id/:page', component: FollowedComponent, canActivate: [UserGuard] },
    { path: '**', component: LoginComponent }
];
export const appRoutingProviders = [];
export const routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map