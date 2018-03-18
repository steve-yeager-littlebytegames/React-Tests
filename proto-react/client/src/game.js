export default class Game {
    constructor(setRules, charactersPerMatch, maxPoints, characters, stages) {
        this.setRules = setRules;
        this.charactersPerMatch = charactersPerMatch;
        this.maxPoints = maxPoints;
        this.characters = characters;
        this.stages = stages;
    }

    get requiresStage() {
        return this.stages.length > 0;
    }
}