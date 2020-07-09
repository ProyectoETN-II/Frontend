import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
let FollowingComponent = class FollowingComponent {
    constructor(_route, _router, _userService, _followService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._followService = _followService;
        this.title = 'Usuarios seguidos por';
        this.url = GLOBAL.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }
    ngOnInit() {
        this.actualPage();
    }
    actualPage() {
        this._route.params.subscribe(params => {
            let user_id = params['id'];
            this.userPageId = user_id;
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
            this.getUser(user_id, page);
        });
    }
    getFollows(user_id, page) {
        this._followService.getFollowing(this.token, user_id, page).subscribe(response => {
            if (!response.follows) {
                this.status = 'error';
            }
            else {
                console.log(response);
                this.total = response.total;
                this.following = response.follows;
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
    getUser(user_id, page) {
        this._userService.getUser(user_id).subscribe(response => {
            if (response.user) {
                this.user = response.user;
                this.getFollows(user_id, page);
            }
            else {
                this._router.navigate(['/home']);
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
FollowingComponent = __decorate([
    Component({
        selector: 'following',
        templateUrl: './following.component.html',
        providers: [UserService, FollowService]
    })
], FollowingComponent);
export { FollowingComponent };
//# sourceMappingURL=following.component.js.map