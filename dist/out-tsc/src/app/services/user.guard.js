import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserGuard = class UserGuard {
    constructor(_router, _userService) {
        this._router = _router;
        this._userService = _userService;
    }
    canActivate() {
        let identity = this._userService.getIdentity();
        if (identity && (identity.role == 'ROLE_USER' || identity.role == 'ROLE_ADMIN')) {
            return true;
        }
        else {
            this._router.navigate(['/login']);
            return false;
        }
    }
};
UserGuard = __decorate([
    Injectable()
], UserGuard);
export { UserGuard };
//# sourceMappingURL=user.guard.js.map