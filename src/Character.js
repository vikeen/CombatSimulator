class Character {
    static createFromJSON(json) {
        const character = new Character();

        character.name = json.name;
        character.level = json.level;
        character.xp = json.xp;
        character.maxHealth = json.maxHealth;
        character.currentHealth = json.currentHealth;
        character.stats = json.stats;
        character.isAlive = json.currentHealth > 0;
        character.isDead = json.currentHealth <= 0;
        character.equipment = json.equipment;

        return character;
    }

    addXp(xp = 0) {
        this.xp = this.xp + xp;
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
            damage: this.equipment.weapon.damage
        }
    }
}

Character.ARCHETYPES = {
    FIGHTER: 'fighter'
};

export default Character;