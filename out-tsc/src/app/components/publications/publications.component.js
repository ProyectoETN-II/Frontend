import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
let PublicationsComponent = class PublicationsComponent {
    constructor(_route, _router, _userService, _publicationService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._publicationService = _publicationService;
        this.noMore = false;
        this.title = 'Publicaciones';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }
    ngOnInit() {
        this.getPublications(this.user, this.page);
    }
    getPublications(user, page, adding = false) {
        this._publicationService.getPublicationsUser(this.token, user, page).subscribe(response => {
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
                    $("html, body").animate({ scrollTop: $('html').prop("scrollHeight") }, 500);
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
        this.getPublications(this.user, this.page, true);
    }
};
__decorate([
    Input()
], PublicationsComponent.prototype, "user", void 0);
PublicationsComponent = __decorate([
    Component({
        selector: 'publications',
        templateUrl: './publications.component.html',
        providers: [UserService, PublicationService]
    })
], PublicationsComponent);
export { PublicationsComponent };
/*
window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    console.log("on")
    const scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        viewMore();
    }
*/
//# sourceMappingURL=publications.component.js.map