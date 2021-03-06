import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let UserService = class UserService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    register(user) {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'register', params, { headers: headers });
    }
    signup(user, gettoken = null) {
        if (gettoken != null) {
            user.gettoken = gettoken;
        }
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers });
    }
    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    }
    getToken() {
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    }
    getStats() {
        let stats = JSON.parse(localStorage.getItem('stats'));
        if (stats != "undefined") {
            this.stats = stats;
        }
        else {
            this.stats = null;
        }
        return this.stats;
    }
    getCounters(userId = null) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        if (userId != null) {
            return this._http.get(this.url + 'counters/' + userId, { headers: headers });
        }
        else {
            return this._http.get(this.url + 'counters', { headers: headers });
        }
    }
    updateUser(user) {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/' + user._id, params, { headers: headers });
    }
    getUsers(page = null) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.get(this.url + 'users/' + page, { headers: headers });
    }
    getUser(id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', this.getToken());
        return this._http.get(this.url + 'user/' + id, { headers: headers });
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map