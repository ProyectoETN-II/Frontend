import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from "@angular/core";
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';
let SidebarComponent = class SidebarComponent {
    constructor(_userService, _followService, _publicationService, _uploadService, _route, _router) {
        this._userService = _userService;
        this._followService = _followService;
        this._publicationService = _publicationService;
        this._uploadService = _uploadService;
        this._route = _route;
        this._router = _router;
        // Output
        this.sended = new EventEmitter();
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication("", "", "", "", this.identity._id);
        this.followed = false;
        this.following = false;
    }
    onSubmit(form, $event) {
        this._publicationService.addPublication(this.token, this.publication).subscribe(response => {
            if (response.publication) {
                //this.publication = response.publication;
                if (this.filesToUpload && this.filesToUpload.length) {
                    //Subir imagen
                    this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
                        .then((result) => {
                        this.status = 'success';
                        this.publication.file = result.image;
                        form.reset();
                        this._router.navigate(['/publicaciones']);
                        this.sended.emit({ send: 'true' });
                    });
                }
                else {
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/publicaciones']);
                    this.sended.emit({ send: 'true' });
                }
            }
            else {
                this.status = 'error';
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
    sendPublication(event) {
        this.sended.emit({ send: 'true' });
    }
    ngOnInit() {
        this.loadPage();
    }
    loadPage() {
        this._route.params.subscribe(params => {
            let id = params['id'];
            this.getCounters(id);
        });
    }
    getCounters(id) {
        this._userService.getCounters(id).subscribe(response => {
            this.stats = response;
        }, error => {
            console.log(error);
        });
    }
};
__decorate([
    Output()
], SidebarComponent.prototype, "sended", void 0);
SidebarComponent = __decorate([
    Component({
        selector: 'sidebar',
        templateUrl: './sidebar.component.html',
        providers: [UserService, FollowService, PublicationService, UploadService]
    })
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map