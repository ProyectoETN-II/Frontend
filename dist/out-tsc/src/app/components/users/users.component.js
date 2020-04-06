import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
let UsersComponent = class UsersComponent {
    constructor(_route, _router, _userService, _followService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._followService = _followService;
        this.title = 'Sugerencias';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    ngOnInit() {
        this.actualPage();
    }
    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;
            if (!params['page']) {
                page = 1;
            }
            if (!page) {
                page = 1;
            }
            else {
                this.next_page = page + 1;
                this.prev_page = page - 1;
                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
            }
            // devolver listado de usuarios
            this.getUsers(page);
        });
    }
    getUsers(page) {
        this._userService.getUsers(page).subscribe(response => {
            if (!response.users) {
                this.status = 'error';
            }
            else {
                this.total = response.total;
                this.users = response.users;
                this.pages = response.pages;
                this.follows = response.users_following;
                if (page > this.pages) {
                    this._router.navigate(['/gente', 1]);
                }
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
    mouseEnter(user_id) {
        this.followUserOver = user_id;
    }
    mouseLeave(user_id) {
        this.followUserOver = 0;
    }
    followUser(followed) {
        var follow = new Follow('', this.identity._id, followed);
        //cambio antes era addFollow_Request_Request 
        this._followService.addFollow(this.token, follow).subscribe(response => {
            if (!response.follow) {
                this.status = 'error';
            }
            else {
                this.status = 'success';
                this.follows.push(followed);
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
    unfollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(response => {
            var search = this.follows.indexOf(followed);
            if (search != -1) {
                this.follows.splice(search, 1);
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
};
UsersComponent = __decorate([
    Component({
        selector: 'users',
        templateUrl: './users.component.html',
        providers: [UserService, FollowService]
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map