import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { LikeService } from '../../services/like.service';
import { Like } from '../../models/like';
let TimelineComponent = class TimelineComponent {
    constructor(_route, _router, _userService, _publicationService, _likeService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._publicationService = _publicationService;
        this._likeService = _likeService;
        this.noMore = false;
        this.title = 'publicaciones';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
        this.seeImage = true;
    }
    ngOnInit() {
        this.getPublications(this.page);
    }
    getPublications(page, adding = false) {
        this._publicationService.getPublications(this.token, page).subscribe(response => {
            if (response.publications) {
                this.total = response.total_items;
                this.pages = response.pages;
                this.itemsPerPage = response.items_per_page;
                if (!adding) {
                    this.publications = response.publications;
                }
                else {
                    var arrayA = this.publications;
                    var arrayB = response.publications;
                    this.publications = arrayA.concat(arrayB);
                    $("html, body").animate({ scrollTop: $('body').prop("scrollHeight") }, 500);
                }
                if (page > this.pages) {
                    //this._router.navigate(['/home']);
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
    viewMore() {
        this.page += 1;
        if (this.page == this.pages) {
            this.noMore = true;
        }
        this.getPublications(this.page, true);
    }
    refresh(event = null) {
        this.getPublications(1);
    }
    deletePublication(id) {
        this._publicationService.deletePublication(this.token, id).subscribe(response => {
            this.refresh();
        }, error => {
            console.log(error);
        });
    }
    likePublicaction(liked, publication) {
        var like = new Like('', this.identity._id, liked, publication);
        this._likeService.addLike(this.token, like).subscribe(response => {
            if (!response.like) {
                this.status = 'error';
            }
            else {
                this.status = 'success';
                //his.follows.push(followed);
            }
        }, error => {
            var errorMessage = error;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        });
    }
};
TimelineComponent = __decorate([
    Component({
        selector: 'timeline',
        templateUrl: './timeline.component.html',
        providers: [UserService, PublicationService, LikeService]
    })
], TimelineComponent);
export { TimelineComponent };
//# sourceMappingURL=timeline.component.js.map