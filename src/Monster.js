const MONSTERS = {
    goblin: {
        name: "goblin",
        maxHealth: 3,
        stats: {
            strength: 4,
            agility: 6,
            intelligence: 2
        },
        attack: {
            name: "club",
            damage: 2
        },
        xp: 5
    },
    "goblin-captain": {
        name: "goblin captain",
        maxHealth: 7,
        stats: {
            strength: 5,
            agility: 7,
            intelligence: 3
        },
        attack: {
            name: "club",
            damage: 4
        },
        xp: 10
    }
};

class Monster {
    static createById(id) {
        const monster = new Monster();
        const monsterConfig = MONSTERS[id];

        monster.name = monsterConfig.name;
        monster.maxHealth = monsterConfig.maxHealth;
        monster.currentHealth = monsterConfig.maxHealth;
        monster.stats = monsterConfig.stats;
        monster.attack = monsterConfig.attack;
        monster.xp = monsterConfig.xp;
        monster.isAlive = true;
        monster.isDead = false;

        return monster;
    }

    takeDamage(damage = 0) {
        this.currentHealth = this.currentHealth - damage;

        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            this.isAlive = false;
            this.isDead = true;
        }
    }

    makeAttack() {
        return {
            damage: this.attack.damage
        }
    }
}

export default Monster;