import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let FollowService = class FollowService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    addFollow(token, follow) {
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'follow', params, { headers: headers });
    }
    deleteFollow(token, id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'follow/' + id, { headers: headers });
    }
    getFollowing(token, userId = null, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        var url = this.url + 'following';
        if (userId != null) {
            url = this.url + 'following/' + userId + '/' + page;
        }
        return this._http.get(url, { headers: headers });
    }
    getFollowed(token, userId = null, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        var url = this.url + 'followed';
        if (userId != null) {
            url = this.url + 'followed/' + userId + '/' + page;
        }
        return this._http.get(url, { headers: headers });
    }
    getMyFollows(token) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'get-my-follows/true', { headers: headers });
    }
};
FollowService = __decorate([
    Injectable()
], FollowService);
export { FollowService };
//# sourceMappingURL=follow.service.js.map