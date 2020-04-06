import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';
let AppComponent = class AppComponent {
    constructor(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'RedSocial';
        this.url = GLOBAL.url;
    }
    ngOnInit() {
        this.identity = this._userService.getIdentity();
    }
    ngDoCheck() {
        this.identity = this._userService.getIdentity();
    }
    logout() {
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        providers: [UserService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map