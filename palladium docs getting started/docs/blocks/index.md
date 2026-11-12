# Blocks

To create custom blocks using addonpacks, create a JSON file at:

```
addon/<namespace>/block/<block_id>.json
```

For example, `addon/mypack/block/ruby_ore.json` registers the block `mypack:ruby_ore`.

---

## Block Types

Every block file requires a `type` field. There are a large number of vanilla block types available. A few common ones are listed below.

| Type                        | Description                                                          |
|-----------------------------|----------------------------------------------------------------------|
| `minecraft:block`           | A basic full-cube block. Good starting point for most custom blocks. |
| `minecraft:rotated_pillar`  | A block with an axis-dependent orientation, like logs or basalt.     |
| `minecraft:slab`            | A half-block slab with top/bottom/double placement states.           |
| `minecraft:stair`           | A stair block with full directional states.                          |
| `minecraft:cake`            | A block with bite states, like vanilla cake.                         |
| `minecraft:drop_experience` | A block that drops XP when broken.                                   |

---

## Properties

All properties are optional. If a property is omitted, the vanilla default for that block type applies.

| Field                             | Type           | Description                                                                                      |
|-----------------------------------|----------------|--------------------------------------------------------------------------------------------------|
| `map_color`                       | String         | Color shown on a map. One of the 16 dye color names (e.g. `gray`, `light_blue`).                 |
| `sound`                           | Identifier     | Sound group used for footsteps, breaking and placing. See [Sound Types](#sound-types) below.     |
| `destroy_time`                    | Float          | How long it takes to break the block. Stone is `1.5`, obsidian is `50.0`.                        |
| `explosion_resistance`            | Float          | Resistance to explosions. Stone is `6.0`, obsidian is `1200.0`.                                  |
| `requires_correct_tool_for_drops` | Boolean        | When `true`, the block only drops items when broken with the right tool.                         |
| `light_level`                     | Integer (0-15) | How much light the block emits.                                                                  |
| `no_collission`                   | Boolean        | When `true`, entities can pass through the block.                                                |
| `no_occlusion`                    | Boolean        | When `true`, the block does not hide faces of adjacent blocks (useful for transparent blocks).   |
| `friction`                        | Float          | Slipperiness. Ice is `0.98`, most blocks are `0.6`.                                              |
| `speed_factor`                    | Float          | Multiplier for movement speed on top of the block.                                               |
| `jump_factor`                     | Float          | Multiplier for jump height on top of the block.                                                  |
| `push_reaction`                   | String         | How pistons interact with the block. One of `normal`, `destroy`, `block`, `ignore`, `push_only`. |
| `instrument`                      | String         | Note block instrument when placed below one (e.g. `basedrum`, `hat`, `bass`, `guitar`).          |
| `random_ticks`                    | Boolean        | When `true`, the block receives random ticks.                                                    |
| `ignited_by_lava`                 | Boolean        | When `true`, the block can catch fire from adjacent lava.                                        |
| `liquid`                          | Boolean        | Marks the block as a liquid.                                                                     |

### Sound Types

The `sound` field accepts a `minecraft:` prefixed identifier. Common values:

`minecraft:stone`, `minecraft:wood`, `minecraft:gravel`, `minecraft:grass`, `minecraft:sand`,
`minecraft:metal`, `minecraft:glass`, `minecraft:wool`, `minecraft:snow`, `minecraft:deepslate`,
`minecraft:tuff`, `minecraft:copper`, `minecraft:amethyst`, `minecraft:netherite_block`,
`minecraft:ancient_debris`, `minecraft:basalt`, `minecraft:bone_block`, `minecraft:candle`

---

## Block Item

A block on its own cannot be picked up or placed from an inventory. To make it obtainable as an item, you need to register a separate block item using the [`minecraft:block_item`](../items/index.md#minecraftblock_item) type:

```json title="addon/mypack/item/ruby_ore.json"
{
  "type": "minecraft:block_item",
  "block": "mypack:ruby_ore",
  "properties": {}
}
```

---

## Required Assets

By default, the block will have no model or texture, not even an item. For this you need to create a bunch of additional files that tell the game how to render your block.  
If you used any "special" block type (e.g. `minecraft:stairs`) it would be recommended to take a look at Minecraft's source files to see how the blockstate and model files of them look like. The following examples demonstrate the structure for the basic `minecraft:block` type. 

### Blockstate File

Defines which model a block uses depending on its state. For a basic block with no state variants:

```json title="assets/<namespace>/blockstates/<block_id>.json"
{
  "variants": {
    "": {
      "model": "<namespace>:block/<block_id>"
    }
  }
}
```

### Block Model File

Defines the shape and textures of the block. For a basic full-cube block:

```json title="assets/<namespace>/models/block/<block_id>.json"
{
  "parent": "minecraft:block/cube_all",
  "textures": {
    "all": "<namespace>:block/<block_id>"
  }
}
```

The texture path points to `assets/<namespace>/textures/block/<block_id>.png`. You can also use a custom model exported from [Blockbench](https://www.blockbench.net/).

### Item Definition File

Required since Minecraft 1.21.4, this tells the game which model to use for the block's item form:

```json title="assets/<namespace>/items/<block_id>.json"
{
  "model": {
    "type": "minecraft:model",
    "model": "<namespace>:block/<block_id>"
  }
}
```

### Language File

```json title="assets/<namespace>/lang/en_us.json"
{
  "block.<namespace>.<block_id>": "My Block Name"
}
```

---

## Optional Data

### Loot Table

Defines what the block drops when broken. Place it at `data/<namespace>/loot_tables/blocks/<block_id>.json`. If omitted, the block drops nothing.

### Tags

Block tags control tool requirements and other behaviour. The most relevant are:

- `minecraft:mineable/pickaxe`, `minecraft:mineable/axe`, `minecraft:mineable/shovel` - which tool mines the block
- `neoforge:needs_wood_tool`, `minecraft:needs_stone_tool`, `minecraft:needs_iron_tool`, `neoforge:needs_gold_tool`,`minecraft:needs_diamond_tool`, `neoforge:needs_netherite_tool` - minimum tool tier required for drops. Some are added by Minecraft itself, some additional ones are added by NeoForge. **You only need one**.

There are also tags that are needed for special block types. For example, if you've made a stair block, you need to add your block to the `minecraft:stairs` tag. Same goes for slabs.

---

## Examples

```json title="addon/mypack/block/ruby_ore.json"
{
  "type": "minecraft:block",
  "properties": {
    "map_color": "light_gray",
    "requires_correct_tool_for_drops": true,
    "instrument": "basedrum",
    "destroy_time": 1.5,
    "explosion_resistance": 6
  }
}
```

```json title="addon/mypack/block/fluffy_block.json"
{
  "type": "minecraft:block",
  "properties": {
    "sound": "minecraft:wool",
    "destroy_time": 0.5,
    "explosion_resistance": 0.5,
    "push_reaction": "destroy"
  }
}
```
