import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
let UploadService = class UploadService {
    constructor() {
        this.url = GLOBAL.url;
    }
    makeFileRequest(url, params, files, token, name) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
};
UploadService = __decorate([
    Injectable()
], UploadService);
export { UploadService };
//# sourceMappingURL=upload.service.js.map