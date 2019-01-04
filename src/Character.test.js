import Character from './Character';

const createCharacter = () => {
    return Character.createFromJSON({
        name: "Vikeen",
        archetype: Character.ARCHETYPES.FIGHTER,
        level: 1,
        xp: 0,
        maxHealth: 16,
        currentHealth: 16,
        stats: {
            strength: 10,
            agility: 6,
            intelligence: 4
        },
        equipment: {
            weapon: {
                name: "copper sword",
                damage: 3
            }
        }
    });
};

test('create a simple character', () => {
    const character = createCharacter();

    expect(character.name).toBe("Vikeen");
    expect(character.level).toBe(1);
    expect(character.xp).toBe(0);
    expect(character.maxHealth).toBe(16);
    expect(character.currentHealth).toBe(16);
    expect(character.stats).toEqual({
        strength: 10,
        agility: 6,
        intelligence: 4
    });
    expect(character.isAlive).toBe(true);
    expect(character.isDead).toBe(false);
});

test('add xp', () => {
    const character = createCharacter();

    expect(character.xp).toBe(0);

    character.addXp(50);

    expect(character.xp).toBe(50);
});

test('can take damage', () => {
    const character = createCharacter();

    expect(character.maxHealth).toBe(16);
    expect(character.currentHealth).toBe(16);

    character.takeDamage(10);

    expect(character.maxHealth).toBe(16);
    expect(character.currentHealth).toBe(6);
});

test('can die', () => {
    const character = createCharacter();

    expect(character.isAlive).toBe(true);
    expect(character.isDead).toBe(false);
    expect(character.maxHealth).toBe(16);
    expect(character.currentHealth).toBe(16);

    character.takeDamage(10);
    character.takeDamage(10);

    expect(character.isAlive).toBe(false);
    expect(character.isDead).toBe(true);
    expect(character.maxHealth).toBe(16);
    expect(character.currentHealth).toBe(0);
});

test('can makeAttack', () => {
    const character = createCharacter();
    const attack = character.makeAttack();

    expect(attack.damage).toBe(3);
});