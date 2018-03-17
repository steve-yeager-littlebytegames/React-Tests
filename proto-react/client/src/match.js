export default class Match {
    constructor(index) {
        this.index = index;
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1Characters = [];
        this.p2Characters = [];
        this.stage = null;
    }

    get isComplete() {
        return this.p1Score != this.p2Score && (this.p1Score > 0 || this.p2Score > 0);
    }
}