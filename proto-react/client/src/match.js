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

    compareTo(other) {
        return this.index == other.index
            && this.p1Score == other.p1Score
            && this.p2Score == other.p2Score
            && this.p1Characters.length == other.p1Characters.length && this.p1Characters.every((v, i) => v === other.p1Characters[i])
            && this.p2Characters.length == other.p2Characters.length && this.p2Characters.every((v, i) => v === other.p2Characters[i])
            && this.stage == other.stage;
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