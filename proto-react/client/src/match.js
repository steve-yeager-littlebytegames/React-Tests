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

    static clone(source) {
        var newMatch = new Match(source.index);
        newMatch.p1Score = source.p1Score;
        newMatch.p2Score = source.p2Score;
        newMatch.p1Characters = source.p1Characters.slice(0);
        newMatch.p2Characters = source.p2Characters.slice(0);
        newMatch.stage = source.stage;
        return newMatch;
    }
}