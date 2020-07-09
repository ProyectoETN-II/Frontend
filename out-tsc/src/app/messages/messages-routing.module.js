import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';
import { UserGuard } from '../services/user.guard';
const messagesRoutes = [
    {
        path: 'mensajes',
        component: MainComponent,
        children: [
            { path: '', redirectTo: 'recibidos', pathMatch: 'full' },
            { path: 'enviar', component: AddComponent, canActivate: [UserGuard] },
            { path: 'recibidos', component: ReceivedComponent, canActivate: [UserGuard] },
            { path: 'recibidos/:page', component: ReceivedComponent, canActivate: [UserGuard] },
            { path: 'enviados', component: SendedComponent, canActivate: [UserGuard] },
            { path: 'enviados/:page', component: SendedComponent, canActivate: [UserGuard] }
        ]
    }
];
let MessagesRoutingModule = class MessagesRoutingModule {
};
MessagesRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forChild(messagesRoutes)
        ],
        exports: [
            RouterModule
        ]
    })
], MessagesRoutingModule);
export { MessagesRoutingModule };
//# sourceMappingURL=messages-routing.module.js.map