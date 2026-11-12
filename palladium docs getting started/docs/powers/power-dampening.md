---
sidebar_position: 5
---

# Power Dampening

Power dampening switches powers off for as long as the player wears or holds a certain item. Think of a kryptonite necklace that weakens a Kryptonian, handcuffs that block magic, or an inhibitor collar for mutants. As soon as the item is taken off again, the powers come back on their own.

You don't need to change the powers themselves for this. Dampening is set up entirely on the item.

:::note
Right now, items are the only source of dampening that Palladium itself provides. Other mods can add their own sources though, by registering a `PowerDampeningSource` in the `palladium:power_dampening_source` registry. A mod could, for example, dampen powers inside certain areas or while a specific effect is active.
:::

---

## How It Works

An item dampens powers through the `palladium:power_dampening` [data component](/docs/items/data-components#palladiumpower_dampening). The component says which powers are dampened, and in which slot the item has to be for that to happen.

While a power is dampened:

- **All of its abilities are locked.** It's the same as if their unlocking requirements weren't met. Abilities that were turned on switch off, and none of them can be used. In the ability bar they show up as locked.
- **Its energy bars stop changing.** They don't refill or drain on their own while the power is dampened. Abilities can't use them anyway, since they are locked.

Once the item is gone, every ability goes back to normal. Abilities that had to be bought stay bought, nothing is lost. A toggle ability that was on before is off afterwards though, so the player has to switch it on again.

---

## Setting Up the Item

The component is a map. Each key is a slot, each value says which powers are dampened while the item is in that slot:

```json
"palladium:power_dampening": {
  "chest": "mypack:speedster"
}
```

This item dampens the power `mypack:speedster` while it is worn in the chest slot. Holding it in the hand does nothing.

### Slots

| Slot             | The item has to be...                                     |
|------------------|-----------------------------------------------------------|
| `mainhand`       | held in the main hand                                     |
| `offhand`        | held in the off hand                                      |
| `head`           | worn as a helmet                                          |
| `chest`          | worn as a chestplate                                      |
| `legs`           | worn as leggings                                          |
| `feet`           | worn as boots                                             |
| `body`           | worn in the body slot (horse armor, wolf armor and so on) |
| `curios:<slot>`  | in a [Curios](https://www.curseforge.com/minecraft/mc-mods/curios) slot, like `curios:necklace` (needs Curios) |
| `*` or `any`     | in any of the slots above                                 |

Items that are just lying somewhere in the inventory never dampen anything. The item has to be held, worn or equipped in one of these slots. That's on purpose: carrying the kryptonite around in your backpack shouldn't be enough.

### Which Powers

The value for a slot can be:

- a single power ID: `"mypack:speedster"`
- a list of power IDs: `["mypack:speedster", "mypack:flight"]`
- a power tag: `"#mypack:kryptonian"`

A list can only contain IDs, and a tag has to stand on its own. If you need both, combine them with `neoforge:or`:

```json
"palladium:power_dampening": {
  "*": {
    "type": "neoforge:or",
    "values": [
      "mypack:speedster",
      "#mypack:kryptonian"
    ]
  }
}
```

### Power Tags

Tags are the most flexible option, because new powers can be added to them later without touching the item. Power tags live in the `palladium/power` tag folder:

```json title="data/mypack/tags/palladium/power/kryptonian.json"
{
  "values": [
    "mypack:superman",
    "mypack:supergirl"
  ]
}
```

This tag can then be used as `#mypack:kryptonian`.

Palladium comes with three tags that are empty by default and meant to be shared between addon packs: `#palladium:is_magical`, `#palladium:is_mechanical` and `#palladium:is_genetic`. If your power is magic, adding it to `#palladium:is_magical` means every magic-blocking item from any pack works on it right away. To add your powers to one of them, put the file into the `palladium` namespace:

```json title="data/palladium/tags/palladium/power/is_magical.json"
{
  "values": [
    "mypack:sorcerer"
  ]
}
```

:::info
It's best practice to put every power you make into one of these three tags. Even if your pack doesn't use dampening at all, someone else's pack might, and their items will only work on your powers if the powers are tagged.
:::

---

## Protecting Single Abilities

Sometimes a few abilities should keep working even while the power is dampened. That's what `allow_dampening` in the ability [properties](/docs/powers#properties) is for. It's `true` by default, set it to `false` and the ability ignores dampening completely:

```json
"properties": {
  "title": "Healing Factor",
  "allow_dampening": false
}
```

This is useful for passive things that are part of the character rather than a power they actively use, or for weaknesses that should keep applying.

---

## Getting the Item

Any item can get the component. In an addon pack, add it to the item's components:

```json title="addon/mypack/item/kryptonite_necklace.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "palladium:power_dampening": {
        "curios:necklace": "#mypack:kryptonian"
      }
    }
  }
}
```

For testing, you can also give yourself any vanilla item with the component through a command:

```
/give @s minecraft:iron_ingot[palladium:power_dampening={"mainhand":"#palladium:is_magical"}]
```

---

## Examples

### Simple: Dampening While Held

A rod that blocks the `mypack:speedster` power while you hold it in either hand:

```json title="addon/mypack/item/speed_force_dampener.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "palladium:power_dampening": {
        "mainhand": "mypack:speedster",
        "offhand": "mypack:speedster"
      }
    }
  }
}
```

### Medium: A Wearable That Blocks a Whole Group

Handcuffs worn on the chest that block every power in the shared magic tag. Your own magic powers are added to the tag, so the cuffs and the powers don't need to know about each other:

```json title="addon/mypack/item/runic_cuffs.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "palladium:power_dampening": {
        "chest": "#palladium:is_magical"
      }
    }
  }
}
```

```json title="data/palladium/tags/palladium/power/is_magical.json"
{
  "values": [
    "mypack:sorcerer",
    "mypack:witch"
  ]
}
```

### Advanced: Kryptonite With Exceptions

A kryptonite shard that dampens all Kryptonian powers in any slot, and on top of that one extra power in the off hand only. The Kryptonian powers keep a passive weakness ability that stays active while dampened.

```json title="addon/mypack/item/kryptonite_shard.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "palladium:power_dampening": {
        "*": "#mypack:kryptonian",
        "offhand": {
          "type": "neoforge:or",
          "values": [
            "mypack:eradicator",
            "#mypack:kryptonian"
          ]
        }
      }
    }
  }
}
```

```json title="data/mypack/tags/palladium/power/kryptonian.json"
{
  "values": [
    "mypack:superman",
    "mypack:supergirl"
  ]
}
```

```json title="data/mypack/palladium/power/superman.json (excerpt)"
"kryptonite_weakness": {
  "type": "palladium:attribute_modifier",
  "modifiers": {
    "attribute": "minecraft:movement_speed",
    "amount": -0.03,
    "operation": "add_value"
  },
  "properties": {
    "allow_dampening": false,
    "hidden_in_bar": true
  },
  "state": {
    "enabling": [
      {
        "type": "palladium:item_in_slot",
        "item": "mypack:kryptonite_shard",
        "slot": "*"
      }
    ]
  }
}
```

While the shard is held or worn, every other ability of Superman is locked, but `kryptonite_weakness` ignores the dampening and slows him down as long as the shard is around.
