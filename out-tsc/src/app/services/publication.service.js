import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let PublicationService = class PublicationService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    addPublication(token, publication) {
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'publication', params, { headers: headers });
    }
    getPublications(token, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'publications/' + page, { headers: headers });
    }
    getPublicationsUser(token, user_id, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'publications-user/' + user_id + '/' + page, { headers: headers });
    }
    deletePublication(token, id) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'publication/' + id, { headers: headers });
    }
};
PublicationService = __decorate([
    Injectable()
], PublicationService);
export { PublicationService };
//# sourceMappingURL=publication.service.js.map