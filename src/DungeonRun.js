export default class DungeonRun {
    constructor(character, encounters = []) {
        this.character = character;
        this.startTime = null;
        this.endTime = null;
        this.encounters = encounters;
        this.encounterIndex = 0;
        this.monstersKilled = [];
        this.rewards = {
            xp: 0
        };
    }

    start() {
        this.startTime = Date.now();
    }

    startNextEncounter() {
        const encounter = this.encounters[this.encounterIndex];

        if (encounter.type === "battle") {
            const monster = encounter.monsters[0];

            while (this.character.isAlive && monster.isAlive) {
                // the character attacks
                const characterAttack = this.character.makeAttack();
                monster.takeDamage(characterAttack.damage);

                // the monster attacks
                const monsterAttack = monster.makeAttack();
                this.character.takeDamage(monsterAttack.damage);
            }

            if (monster.isDead) {
                this.monstersKilled.push(monster);
                this.rewards.xp = this.rewards.xp + monster.xp;
            }
        }

        this.encounterIndex = this.encounterIndex + 1;
    }

    end() {
        this.endTime = Date.now();

        this.character.addXp(this.rewards.xp);
    }
}