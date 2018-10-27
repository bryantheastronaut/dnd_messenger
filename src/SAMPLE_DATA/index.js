export const SEED_PLAYER_DATA = [
  {
    playerId: '0',
    isDM: true,
    name: 'Einrich Goldbar',
    gameData: {
      notes: [
        'in the town of Maringold',
        'looking for dwarf who has info on where the king has gone'
      ],
      proximityCharacters: [
        'Tilly -- Traveling Merchant. 35 gold and various magical trinkets',
        'Stranger -- Sitting alone drinking at the bar.'
      ]
    }
  }, {
    playerId: '1',
    isDM: false,
    name: 'Sara Xintach',
    level: 12,
    currentXP: 1288,
    armorClass: 2,
    initiative: 2,
    speed: 9,
    hp: {
      current: 78,
      total: 90,
    },
    bio: {
      background: 'Sara was found in the forest with no memory. She has a keen eye for valuables',
      race: 'Wood Elf',
      age: 22,
      pronouns: 'she/her',
      appearance: 'Tall, slender wood elf. One ear is mangled for unknown reason. Fair skin. Long, golden hair, usually kept up in a pile on top of her head'
    },
    stats: {
      strength: 8,
      dexterity: 9,
      constitution: 6,
      intelligence: 8,
      wisdom: 3,
      charisma: 11,
    },
    skills: {
      acrobatics: 2,
      animalHandling: 0,
      arcana: 0,
      athletics: 2,
      deception: 2,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 2,
      performance: 0,
      persuasion: 5,
      religion: 0,
      sleightOfHand: 1,
      stealth: 4,
      survival: 0,
    },
    inventory: {
      stuff: [
        'old pocketwatch',
        'lockpicking set',
        'silver ring',
      ],
      gold: 144,
    },
    actions: {
      weapons: [
        { name: 'Bow of Truth', roll: { dieCount: 2, dieSides: 6 } }
      ],
      spells: [
        { name: 'Gust of wind', roll: { dieCount: 2, dieSides: 4 } },
      ],
      cantrips: [
        { name: 'Light', roll: null },
        { name: 'Fire Bolt', roll: { dieCount: 1, dieSides: 10 } },
      ]
    }
  }, {
    playerId: '2',
    isDM: false,
    name: 'Rex Felin',
    level: 12,
    currentXP: 1288,
    armorClass: 5,
    initiative: 2,
    speed: 4,
    hp: {
      current: 88,
      total: 110,
    },
    bio: {
      background: 'Rex used to be a Kings guard. When the king disappeared, he travelled out to find him. He\'s strong, but a bit dim',
      race: 'Human',
      age: 33,
      pronouns: 'he / him',
      appearance: 'Large, muscular human male. Scar over right eye. Big beard'
    },
    stats: {
      strength: 15,
      dexterity: 6,
      constitution: 16,
      intelligence: 3,
      wisdom: 3,
      charisma: 16,
    },
    skills: {
      acrobatics: 0,
      animalHandling: 2,
      arcana: 0,
      athletics: 5,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 6,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 1,
      performance: 0,
      persuasion: 2,
      religion: 0,
      sleightOfHand: 0,
      stealth: 0,
      survival: 6,
    },
    inventory: {
      stuff: [
        'note from kings kidnapper',
        'crest',
        'silver ring',
      ],
      gold: 84,
    },
    actions: {
      weapons: [
        { name: 'Axe', roll: { dieCount: 2, dieSides: 10 } }
      ],
      spells: [],
      cantrips: [
        { name: 'Healing Touch', roll: { dieCount: 1, dieSides: 6 } },
        { name: 'Fire Bolt', roll: { dieCount: 1, dieSides: 10 } },
      ]
    }
  }
]

export const SEED_LOG = [
  {
    playerId: '1',
    id: 99,
    message: 'I want to search the chest',
  }, {
    playerId: '0',
    id: 100,
    message: 'You found 3 gold and an old, beat up book. You cannot make out the title',
  }, {
    playerId: '2',
    id: 101,
    message: 'Do I recognize the book?',
  }, {
    playerId: '0',
    id: 102,
    message: 'No.'
  }
]