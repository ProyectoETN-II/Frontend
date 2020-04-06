import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
let UserEditComponent = class UserEditComponent {
    constructor(_route, _router, _userService, _uploadService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._uploadService = _uploadService;
        this.title = 'Actualizar mis datos';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }
    onSubmit() {
        this._userService.updateUser(this.user).subscribe(response => {
            if (!response.user) {
                this.status = 'error';
            }
            else {
                this.status = 'success';
                localStorage.setItem('identity', JSON.stringify(this.user));
                this.identity = this.user;
                // SUBIDA DE IMAGEN DE USUARIO
                this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                    .then((result) => {
                    this.user.image = result.user.image;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                });
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
    fileChangeEvent(fileInput) {
        this.filesToUpload = fileInput.target.files;
    }
};
UserEditComponent = __decorate([
    Component({
        selector: 'user-edit',
        templateUrl: './user-edit.component.html',
        providers: [UserService, UploadService]
    })
], UserEditComponent);
export { UserEditComponent };
//# sourceMappingURL=user-edit.component.js.map