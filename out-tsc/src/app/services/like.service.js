import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let LikeService = class LikeService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    addLike(token, like) {
        let params = JSON.stringify(like);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'like', params, { headers: headers });
    }
    deleteLike(token, id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'like/' + id, { headers: headers });
    }
};
LikeService = __decorate([
    Injectable()
], LikeService);
export { LikeService };
//# sourceMappingURL=like.service.js.map