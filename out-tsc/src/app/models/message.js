export class Message {
    constructor(_id, text, viewed, created_at, emitter, receiver) {
        this._id = _id;
        this.text = text;
        this.viewed = viewed;
        this.created_at = created_at;
        this.emitter = emitter;
        this.receiver = receiver;
    }
}
//# sourceMappingURL=message.js.map