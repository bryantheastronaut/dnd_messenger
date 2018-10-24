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


__Game State__:
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
    bio {
      background
      race
      age
      pronouns
      appearance
    }
    stats {
      // ...determine stats
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
    }
  }
}
```