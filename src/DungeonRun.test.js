import Character from './Character';
import Monster from './Monster';
import DungeonRun from './DungeonRun';

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

test('create a simple dungeon run', () => {
    const character = createCharacter();
    const dungeonRun = new DungeonRun(character);

    expect(dungeonRun.startTime).toEqual(null);
    expect(dungeonRun.endTime).toEqual(null);

    dungeonRun.start();

    expect(dungeonRun.startTime).toBeTruthy();
    expect(dungeonRun.character).toBe(character);

    dungeonRun.end();

    expect(dungeonRun.endTime).toBeTruthy();
});

test('character fights and kills a monster', () => {
    const character = createCharacter();
    const goblin = Monster.createById('goblin');
    const dungeonRun = new DungeonRun(character, [{
        type: "battle",
        monsters: [goblin]
    }]);

    dungeonRun.start();

    dungeonRun.startNextEncounter();

    expect(dungeonRun.character.currentHealth).toEqual(14);
    expect(dungeonRun.monstersKilled).toEqual([goblin]);
    expect(dungeonRun.rewards).toEqual({
        xp: 5
    });

    dungeonRun.end();

    expect(character.xp).toEqual(5);
});

test('character completes a dungeon run with 3 battles', () => {
    const character = createCharacter();
    const goblin1 = Monster.createById('goblin');
    const goblin2 = Monster.createById('goblin');
    const goblin3 = Monster.createById('goblin');
    const dungeonRun = new DungeonRun(character, [{
        type: "battle",
        monsters: [goblin1]
    }, {
        type: "battle",
        monsters: [goblin2]
    }, {
        type: "battle",
        monsters: [goblin3]
    }]);

    dungeonRun.start();

    dungeonRun.startNextEncounter();

    expect(dungeonRun.character.currentHealth).toEqual(14);
    expect(dungeonRun.monstersKilled).toEqual([goblin1]);
    expect(dungeonRun.rewards).toEqual({
        xp: 5
    });

    dungeonRun.startNextEncounter();

    expect(dungeonRun.character.currentHealth).toEqual(12);
    expect(dungeonRun.monstersKilled).toEqual([goblin1, goblin2]);
    expect(dungeonRun.rewards).toEqual({
        xp: 10
    });

    dungeonRun.startNextEncounter();

    expect(dungeonRun.character.currentHealth).toEqual(10);
    expect(dungeonRun.monstersKilled).toEqual([goblin1, goblin1, goblin3]);
    expect(dungeonRun.rewards).toEqual({
        xp: 15
    });

    dungeonRun.end();

    expect(character.xp).toEqual(15);
});

test('character takes multiple rounds to kill a monster', () => {
    const character = createCharacter();
    const goblinCaptain = Monster.createById('goblin-captain');
    const dungeonRun = new DungeonRun(character, [{
        type: "battle",
        monsters: [goblinCaptain]
    }]);

    dungeonRun.start();

    dungeonRun.startNextEncounter();

    expect(dungeonRun.character.currentHealth).toEqual(4);
    expect(dungeonRun.monstersKilled).toEqual([goblinCaptain]);
    expect(dungeonRun.rewards).toEqual({
        xp: 10
    });

    dungeonRun.end();

    expect(character.xp).toEqual(10);
});