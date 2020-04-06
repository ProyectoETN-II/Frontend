import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
let ProfileComponent = class ProfileComponent {
    constructor(_route, _router, _userService, _followService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._followService = _followService;
        this.title = 'Perfil';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.followed = false;
        this.following = false;
    }
    ngOnInit() {
        this.loadPage();
    }
    loadPage() {
        this._route.params.subscribe(params => {
            let id = params['id'];
            this.getUser(id);
            this.getCounters(id);
        });
    }
    getUser(id) {
        this._userService.getUser(id).subscribe(response => {
            if (response.user) {
                this.user = response.user;
                if (response.following && response.following._id) {
                    this.following = true;
                }
                else {
                    this.following = false;
                }
                if (response.followed && response.followed._id) {
                    this.followed = true;
                }
                else {
                    this.followed = false;
                }
            }
            else {
                this.status = 'error';
            }
        }, error => {
            console.log(error);
            this._router.navigate(['/perfil', this.identity._id]);
        });
    }
    getCounters(id) {
        this._userService.getCounters(id).subscribe(response => {
            this.stats = response;
        }, error => {
            console.log(error);
        });
    }
    followUser(followed) {
        var follow = new Follow('', this.identity._id, followed);
        this._followService.addFollow(this.token, follow).subscribe(response => {
            this.following = true;
        }, error => {
            console.log(error);
        });
    }
    unfollowUser(followed) {
        this._followService.deleteFollow(this.token, followed).subscribe(response => {
            this.following = false;
        }, error => {
            console.log(error);
        });
    }
    mouseEnter(user_id) {
        this.followUserOver = user_id;
    }
    mouseLeave() {
        this.followUserOver = 0;
    }
};
ProfileComponent = __decorate([
    Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
        providers: [UserService, FollowService]
    })
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map