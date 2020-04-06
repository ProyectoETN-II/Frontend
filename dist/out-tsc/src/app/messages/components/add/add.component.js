import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';
let AddComponent = class AddComponent {
    constructor(_route, _router, _followService, _messageService, _userService) {
        this._route = _route;
        this._router = _router;
        this._followService = _followService;
        this._messageService = _messageService;
        this._userService = _userService;
        this.title = 'Enviar mensaje';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.message = new Message('', '', '', '', this.identity._id, '');
    }
    ngOnInit() {
        this.getMyFollows();
    }
    onSubmit(form) {
        this._messageService.addMessage(this.token, this.message).subscribe(response => {
            if (response.message) {
                this.status = 'success';
                form.reset();
            }
        }, error => {
            this.status = 'error';
            console.log(error);
        });
    }
    getMyFollows() {
        this._followService.getMyFollows(this.token).subscribe(response => {
            this.follows = response.follows;
        }, error => {
            console.log(error);
        });
    }
};
AddComponent = __decorate([
    Component({
        selector: 'add',
        templateUrl: './add.component.html',
        providers: [FollowService, MessageService]
    })
], AddComponent);
export { AddComponent };
//# sourceMappingURL=add.component.js.map