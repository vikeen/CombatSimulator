import Monster from './Monster';

const createGoblin = () => {
    return Monster.createById("goblin");
};

test('create a simple monster', () => {
    const monster = createGoblin();

    expect(monster.name).toBe("goblin");
    expect(monster.maxHealth).toBe(3);
    expect(monster.currentHealth).toBe(3);
    expect(monster.stats).toEqual({
        strength: 4,
        agility: 6,
        intelligence: 2
    });
    expect(monster.isAlive).toBe(true);
    expect(monster.isDead).toBe(false);
    expect(monster.xp).toBe(5);
});

test('can take damage', () => {
    const monster = createGoblin();

    expect(monster.maxHealth).toBe(3);
    expect(monster.currentHealth).toBe(3);

    monster.takeDamage(2);

    expect(monster.maxHealth).toBe(3);
    expect(monster.currentHealth).toBe(1);
});

test('can die', () => {
    const monster = createGoblin();

    expect(monster.isAlive).toBe(true);
    expect(monster.isDead).toBe(false);
    expect(monster.maxHealth).toBe(3);
    expect(monster.currentHealth).toBe(3);

    monster.takeDamage(2);
    monster.takeDamage(1);

    expect(monster.isAlive).toBe(false);
    expect(monster.isDead).toBe(true);
    expect(monster.maxHealth).toBe(3);
    expect(monster.currentHealth).toBe(0);
});

test('can makeAttack', () => {
    const monster = createGoblin();
    const makeAttack = monster.makeAttack();

    expect(makeAttack.damage).toBe(2);
});