# Items

To create custom items using addonpacks, create a JSON file at:

```
addon/<namespace>/item/<item_id>.json
```

For example, `addon/mypack/item/cool_sword.json` registers the item `mypack:cool_sword`.

---

## Item Types

Every item file requires a `type` field that determines what kind of item it is.

### `minecraft:item`

A basic item with no special behaviour.

```json title="addon/mypack/item/basic_item.json"
{
  "type": "minecraft:item",
  "properties": {}
}
```

---

### `minecraft:block_item`

An item that represents a block (i.e. can be placed). Requires the target block to already be registered.

| Field   | Type       | Description                          |
|---------|------------|--------------------------------------|
| `block` | Identifier | The registry ID of the target block. |

```json title="addon/mypack/item/my_block_item.json"
{
  "type": "minecraft:block_item",
  "block": "mypack:my_block",
  "properties": {}
}
```

---

### `minecraft:sword`

A sword item. Requires a registered [tool material](tool-materials).

| Field           | Type  | Default | Description                                                  |
|-----------------|-------|---------|--------------------------------------------------------------|
| `tool_material` | String | —      | Registry ID of the tool material to use.                     |
| `attack_damage` | Float | `3.0`   | Additional attack damage on top of the tool material's base. |
| `attack_speed`  | Float | `-2.4`  | Attack speed modifier.                                       |

```json title="addon/mypack/item/emerald_sword.json"
{
  "type": "minecraft:sword",
  "tool_material": "mypack:emerald",
  "attack_damage": 3,
  "attack_speed": -2.4,
  "properties": {}
}
```

---

### `minecraft:armor`

An armor item. Requires a registered [armor material](armor-materials).

| Field            | Type   | Description                                                                                          |
|------------------|--------|------------------------------------------------------------------------------------------------------|
| `armor_material` | String | Registry ID of the armor material to use.                                                            |
| `armor_type`     | String | Which armor slot this piece occupies. One of `helmet`, `chestplate`, `leggings`, `boots`, `body`. |

```json title="addon/mypack/item/dirt_chestplate.json"
{
  "type": "minecraft:armor",
  "armor_material": "mypack:dirt",
  "armor_type": "chestplate",
  "properties": {}
}
```

---

### `palladium:vial`

A fluid container holding 500 mB, like a small bucket. Palladium ships the empty vial (`palladium:vial`, behind the `palladium:item/vials` feature flag); addons add filled vials for their own fluids with this type. Vials expose the NeoForge fluid capability, so pipes, tanks and other mods can fill an empty vial into the matching filled vial and drain a filled vial back into an empty one. Only fluids that have a registered vial can be filled in.

| Field   | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| `fluid` | String | Registry ID of the fluid this vial contains. Omit for an empty vial. |

```json title="addon/mypack/item/water_vial.json"
{
  "type": "palladium:vial",
  "fluid": "minecraft:water",
  "properties": {
    "components": {
      "minecraft:max_stack_size": 1
    }
  }
}
```

---

## Properties

The `properties` object is available on all item types and supports the following fields. All fields are optional.

### `components`

Data components to attach to the item. Minecraft's built-in components are documented on the [Minecraft wiki](https://minecraft.wiki/w/Data_component_format#List_of_components). Palladium also adds its own components; see the [Data Components](data-components) page for the full list.

```json
"properties": {
  "components": {
    "minecraft:rarity": "epic",
    "minecraft:glider": {}
  }
}
```

### `tab`

Places the item into one or more creative mode tabs. Accepts a single entry or an array of entries.

**Simple placement:** just add the item to a tab without a specific position:

```json
"tab": "minecraft:tools_and_utilities"
```

**Positional placement:** insert the item relative to another item in the tab:

| Field    | Type       | Description                          |
|----------|------------|--------------------------------------|
| `type`   | String     | `add_after` or `add_before`.         |
| `tab`    | Identifier | The creative tab to place the item in. |
| `target` | Identifier | The item to place this item after or before. |

```json
"tab": {
  "type": "add_after",
  "tab": "minecraft:combat",
  "target": "minecraft:diamond_sword"
}
```

**Multiple tabs:** use an array to place the item in several tabs at once:

```json
"tab": [
  {
    "type": "add_after",
    "tab": "minecraft:building_blocks",
    "target": "minecraft:stone"
  },
  {
    "type": "add_before",
    "tab": "minecraft:natural_blocks",
    "target": "minecraft:stone"
  }
]
```

---

## Required Assets

Your item will have no texture or name until you provide the following files.

### Item Definition File

Since Minecraft 1.21.4, every item requires an item definition file that tells the game which model to render:

```json title="assets/<namespace>/items/<item_id>.json"
{
  "model": {
    "type": "minecraft:model",
    "model": "<namespace>:item/<item_id>"
  }
}
```

### Item Model File

This is the actual model that defines the shape and textures of the item. For a flat 2D item (the most common case), it looks like this:

```json title="assets/<namespace>/models/item/<item_id>.json"
{
  "parent": "minecraft:item/generated",
  "textures": {
    "layer0": "<namespace>:item/<item_id>"
  }
}
```

The `layer0` value points to your texture at `assets/<namespace>/textures/item/<item_id>.png`.

You can also use a custom 3D model exported from [Blockbench](https://www.blockbench.net/) here instead of the generated flat model.

### Language File

To give your item a name, add an entry to your language file at `assets/<namespace>/lang/en_us.json`:

```json title="assets/<namespace>/lang/en_us.json"
{
  "item.<namespace>.<item_id>": "My Item Name"
}
```

---

## Full Examples

### Basic item with a rarity and equippable slot

```json title="addon/mypack/item/magic_hat.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "minecraft:rarity": "epic",
      "minecraft:equippable": {
        "slot": "head"
      }
    },
    "tab": {
      "type": "add_after",
      "tab": "minecraft:tools_and_utilities",
      "target": "minecraft:elytra"
    }
  }
}
```

```json title="assets/mypack/items/magic_hat.json"
{
  "model": {
    "type": "minecraft:model",
    "model": "mypack:item/magic_hat"
  }
}
```

```json title="assets/mypack/models/item/magic_hat.json"
{
  "parent": "minecraft:item/generated",
  "textures": {
    "layer0": "mypack:item/magic_hat"
  }
}
```

### Block item placed in multiple tabs

```json title="addon/mypack/item/my_block.json"
{
  "type": "minecraft:block_item",
  "block": "mypack:my_block",
  "properties": {
    "tab": [
      {
        "type": "add_after",
        "tab": "minecraft:building_blocks",
        "target": "minecraft:stone"
      },
      {
        "type": "add_before",
        "tab": "minecraft:natural_blocks",
        "target": "minecraft:stone"
      }
    ]
  }
}
```
