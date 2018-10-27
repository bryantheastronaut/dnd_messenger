## Single Game Structure

__Roles:__
  - DM
  - Player

__Player:__
  - Character Name
  - Inventory
    * Weapons / Spells
    * Armor
    * Stuff
    * Gold
  - Stats
    * [See DnD character sheet for fields](http://media.wizards.com/2015/downloads/dnd/DDALRoD_CharacterSheet.pdf)
  - Bio section
    * Background
    * Race
    * Age
    * Pronouns
    * Appearance

__DM:__
  - Game Notes
  - NPC / Enemy list
  - Request Roll
  - Award XP
  - Give Item
  - Initiate Fight


__Game State:__
  - Game Name
  - Number of players
  - Room code
  - Chat log
  - Where party is located
  - Rolls: `[{ name: String, value: Number, action: String, dieUsed: String }]`
  - V2 ? Pending Ruling: Boolean
    * this is basically just a flag that says whether other players can do stuff.

---

## DB Structure
```
Game {
  metadata {
    name
    playerCount
    roomCode
    partyLocation
  }
  chatLog [
    {
      message
      playerName
      timestamp
    }
  ]
  players [
    Player
  ]
}

Player {
  name
  isDM
  isDM === true {
    gameData {
      notes
      proximityCharacters
    }
  }
  isDM === false {
    level
    currentXP
    bio {
      background
      race
      age
      pronouns
      appearance
    }
    stats {
      Strength
      Dexterity
      Constitution
      Intelligence
      Wisdom
      Charisma
    },
    skills {
      Acrobatics (Dex)
      Animal Handling (Wis)
      Arcana (Int)
      Athletics (Str)
      Deception (Cha)
      History (Int)
      Insight (Wis)
      Intimidation (Cha)
      Investigation (Int)
      Medicine (Wis)
      Nature (Int)
      Perception (Wis)
      Performance (Cha)
      Persuasion (Cha)
      Religion (Int)
      Sleight of Hand (Dex)
      Stealth (Dex)
      Survival (Wis)
    }
    inventory {
      stuff
      gold
    }
    actions {
      weapons [
        {
          damage
          name?
        }
      ]
      spells [
        {
          damageDie
          name
        }
      ]
      cantrips
    }
  }
}
```