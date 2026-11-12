# Loot Table Modifications
Loot Tables are datapacks files which determine the drops/loot of various aspects of the game. This ranges from dungeon loot to block/entity drops. You can replace loot tables files with datapacks, but that will conflict once two packs override the same file: One will override the other.
Because of this problem Palladium adds "Loot Table Modifications". They allow you to add pools to existing loot tables.

## Setup
First of all, you should get familiar to how loot tables work and how they are structured. You can get some information in the [Minecraft Wiki](https://minecraft.fandom.com/wiki/Loot_table#Pool).
If you want to see all the available loot table files in Minecaft, check [mcassets.cloud](https://mcasset.cloud/1.20.1/data/minecraft/loot_tables).

After that, you can create a json file like this:
```json title="data/<your namespace>/palladium/loot_table_modifications/<name of your modification>.json"
{
  "target": "<target pool ID>",
  "add_pools": {
    ...
  }
}
```
`target` is the ID of the loot table you want to add pools to.  
`add_pools` is an array of pools which you want to add.

## Example
A file to make all dirt blocks also drop a diamond could look like this:
```json
{
  "target": "minecraft:blocks/dirt",
  "add_pools": {
    "name": "add_diamond",
    "bonus_rolls": 0,
    "conditions": [
      {
        "condition": "minecraft:survives_explosion"
      }
    ],
    "entries": [
      {
        "type": "minecraft:item",
        "name": "minecraft:diamond"
      }
    ],
    "rolls": 1
  }
}
```

`target` is the ID of the loot table you want to modify. Can be that of a block, an entity or of loot chests.

`add_pools` are the pools you want to add to the specified table. This can also be an array of multiple pools.

:::danger
Make sure every pool has a "name" object in it.
:::