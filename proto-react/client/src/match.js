export default class Match {
    constructor(id) {
        this.id = id;
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1Characters = [];
        this.p2Characters = [];
        this.stage = null;
    }
}