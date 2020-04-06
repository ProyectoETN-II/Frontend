import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
let MessageService = class MessageService {
    constructor(_http) {
        this._http = _http;
        this.url = GLOBAL.url;
    }
    addMessage(token, message) {
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'message', params, { headers: headers });
    }
    getMyMessages(token, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'my-messages/' + page, { headers: headers });
    }
    getEmmitMessages(token, page = 1) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'messages/' + page, { headers: headers });
    }
};
MessageService = __decorate([
    Injectable()
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map