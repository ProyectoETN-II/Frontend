import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
let LoginComponent = class LoginComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'Identificate';
        this.user = new User("", "", "", "", "", "", "ROLE_USER");
    }
    ngOnInit() {
        this._router.navigate(['/publicaciones']);
    }
    onSubmit() {
        // loguear al usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(response => {
            this.identity = response.user;
            if (!this.identity || !this.identity._id) {
                this.status = 'error';
            }
            else {
                // PERSISTIR DATOS DEL USUARIO
                localStorage.setItem('identity', JSON.stringify(this.identity));
                // Conseguir el token
                this.getToken();
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
    getToken() {
        this._userService.signup(this.user, 'true').subscribe(response => {
            this.token = response.token;
            if (this.token.length <= 0) {
                this.status = 'error';
            }
            else {
                // PERSISTIR TOKEN DEL USUARIO
                localStorage.setItem('token', this.token);
                // Conseguir los contadores o estadisticas del usuario
                this.getCounters();
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
    getCounters() {
        this._userService.getCounters().subscribe(response => {
            localStorage.setItem('stats', JSON.stringify(response));
            this.status = 'success';
            this._router.navigate(['/publicaciones']);
        }, error => {
            console.log(error);
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'login',
        templateUrl: './login.component.html',
        providers: [UserService]
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map