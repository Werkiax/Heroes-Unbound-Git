---
sidebar_position: 2
---

# Assigning Powers to Items
In the previous pages you were explained how to create custom items and powers. However, you might want to have powers bound to items. This page will explain how.

## Individual Items
To get started, you need to create a json file in the following folder: `data/<namespace>/palladium/item_powers/<file name>.json`.  
The file name can be whatever you want, you might want to give it a proper/self-explaining name though.  
The inside should look something like this:

```json title="data/<namespace>/palladium/item_powers/<file name>.json"
{
  "slot": "chest",
  "item": "minecraft:iron_chestplate",
  "power": "test:test_power"
}
```

This example would bind the `test:test_power` to Minecraft's iron chestplate once it is placed inside your chestplate slot. The available slots are "mainhand", "offhand", "feet", "legs, "chest" & "head".

:::tip
If you have Curios or Trinkets installed, you can also use their slots like this: `curios:head`, `trinkets:head/hat`.
:::

You can also use one file to bind multiple powers to an item, like this:
```json
{
  "slot": "chest",
  "item": "minecraft:iron_chestplate",
  // highlight-start
  "power": [
    "test:test_power_1",
    "test:test_power_2"
  ],
  // highlight-end
}
```

Additionally, you can also add power(s) to multiple items in the same way:
```json
{
  "slot": "chest",
  // highlight-start
  "item": [
    "minecraft:iron_chestplate",
    "minecraft:diamond_chestplate"
  ],
  // highlight-end
  "power": "test:test_power"
}
```

Obviously, both those things can be combined.

## Suit Sets
If you've created a suit set, you can assign powers to them aswell. It saves you work by not having to check for all the items being equipped.  
The process is very similar to items:  

```json title="data/<namespace>/palladium/suit_set_powers/<file name>.json"
{
  "suit_set": "test:wood",
  "power": "test:invisibility"
}
```