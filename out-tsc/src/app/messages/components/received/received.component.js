import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';
let ReceivedComponent = class ReceivedComponent {
    constructor(_route, _router, _followService, _messageService, _userService) {
        this._route = _route;
        this._router = _router;
        this._followService = _followService;
        this._messageService = _messageService;
        this._userService = _userService;
        this.title = 'Mensajes recibidos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }
    ngOnInit() {
        this.actualPage();
    }
    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];
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
            this.page = page;
            // devolver listado de usuarios
            this.getMessages(this.token, this.page);
        });
    }
    getMessages(token, page) {
        this._messageService.getMyMessages(token, page).subscribe(response => {
            if (!response.messages) {
            }
            else {
                this.messages = response.messages;
                this.total = response.total;
                this.pages = response.pages;
            }
        }, error => {
            console.log(error);
        });
    }
};
ReceivedComponent = __decorate([
    Component({
        selector: 'received',
        templateUrl: './received.component.html',
        providers: [FollowService, MessageService]
    })
], ReceivedComponent);
export { ReceivedComponent };
//# sourceMappingURL=received.component.js.map