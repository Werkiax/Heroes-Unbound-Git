---
sidebar_position: 1
---

# Powers
Powers are a collection of abilities that can be used as superpowers directly within a player, or can be bound to items or suit sets.
To create a power you simply create a json file in the following folder:

A basic, ability-less setup should look like this:
```json title="data/<namespace>/palladium/powers/<filename>.json"
{
  "name": "Test Power",
  "background": "minecraft:textures/block/red_wool.png",
  "icon": "minecraft:apple",
  "gui_display_type": "list"
}
```

`name` is a text component for the displayed name of the power. It can be a simple string like in the example, but you can also make it translatable (e.g. `"name": { "translate": "mypack.power.example_power" }`.

`background` is the path to a 16x16 texture that will be used as the background in the abilities screen.

`icon` is self-explanatory. You can either use an item from the game as shown, but also an own texture (e.g. `"icon": "mypack:textures/icon/example_power.png"`).

`gui_display_type` *(optional)* can be used to change how the power is display in the powers screen. Can be either "list" for a list, or "tree" for a skill-tree-like view. If not specified, it will use the one that is more logical between those two.

## Adding Abilities
Adding abilities is fairly simple. Check the auto-generated `mods/documentation/palladium/abilities.html` file in your Minecraft folder. It will have ALL available abilities with their settings and an example in it.

```json
{
  "name": "Test Power",
  "background": "minecraft:textures/block/red_wool.png",
  "icon": "minecraft:apple",
  "abilities": {
    "command_1": {
      "type": "palladium:command",
      "commands": [
        "say Hello World"
      ]
    },
    "command": {
      "type": "palladium:command",
      "commands_2": [
        "say Hello World Again"
      ]
    }
  }
}
```

In this example, I added two abilities: `command_1` and `command_2`. Those are the keys, which must be unique within a power. They are also required when e.g. you want to have some abilities depend on others.  
If you compare the command ability used in this example with the one from the html documentation, you see that I did not copy all required settings, as you don't need to do so, it will automatically fall back to the default value if they are not specified.

## Conditions
Just like for abilities, all conditions are listed in a neat html file: `mods/documentation/palladium/conditions.html`.
Abilities can have two sets of conditions: unlocking & enabling conditions. With no conditions applied abilities will run constantly.

```json
{
  "name": "Test Power",
  "background": "minecraft:textures/block/red_wool.png",
  "icon": "minecraft:apple",
  "abilities": {
    "command": {
      "type": "palladium:command",
      "commands": [
        "say Hello World"
      ],
      "conditions": {
        "unlocking": [
          {
            "type": "palladium:health",
            "min_health": 0,
            "max_health": 6
          }
        ],
        "enabling": [
          {
            "type": "palladium:crouching"
          }
        ]
      }
    }
  }
}
```
This will unlock the ability when the player has 3 or less hearts, and execute it when the player is crouching.

If you want to have an ability being dependent on another ability being unlocked, you can do so as in the following example. Here I have two abilities: The first is a command that shouts "Low Health!" once the player is below 3 hearts, and a 2nd ability that heals the player once the first ability is unlocked.

```json
{
  "name": "Test Power",
  "background": "minecraft:textures/block/red_wool.png",
  "icon": "minecraft:apple",
  "abilities": {
    "command": {
      "type": "palladium:command",
      "commands": [
        "say Low Health!"
      ],
      "conditions": {
        "unlocking": [
          {
            "type": "palladium:health",
            "min_health": 0,
            "max_health": 6
          }
        ]
      }
    },
    "healing": {
      "type": "palladium:healing",
      "frequency": 3,
      "amount": 10,
      "conditions": {
        "unlocking": [
          {
            "type": "palladium:ability_unlocked",
            "ability": "command"
          }
        ]
      }
    }
  }
}
```