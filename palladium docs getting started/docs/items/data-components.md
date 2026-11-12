---
sidebar_position: 1
---

# Data Components

Data components are key-value pairs attached to item stacks that define their behaviour and properties. Minecraft has a large set of built-in components (rarity, enchantments, food, etc.). A full list can be found on the [Minecraft wiki](https://minecraft.wiki/w/Data_component_format#List_of_components).

Components are set on an item via the `components` field inside `properties`:

```json
"properties": {
  "components": {
    "minecraft:rarity": "epic",
    "palladium:openable": true
  }
}
```

---

## Palladium Components

Palladium adds the following item components that can be used in addonpack item definitions.

---

### `palladium:render_layers`

Attaches render layers to the item on a per-slot basis. When the item is worn or held in the specified slot, the listed render layers are applied to the player.

The value is an object mapping **slot keys** to one or more render layer IDs. A single ID can be given as a plain string; multiple IDs use a JSON array.

**Slot keys:**

| Key | Description |
|-----|-------------|
| `mainhand` | Held in the main hand |
| `offhand` | Held in the off hand |
| `head` | Worn in the helmet slot |
| `chest` | Worn in the chestplate slot |
| `legs` | Worn in the leggings slot |
| `feet` | Worn in the boots slot |
| `body` | Worn in the body slot |
| `any` / `*` | Active in any slot |
| `curios:<slot>` | A specific Curios slot (e.g. `curios:hat`) |

```json
"palladium:render_layers": {
  "head": "mypack:iron_man_suit",
  "curios:hat": ["mypack:iron_man_suit", "mypack:glow_overlay"]
}
```

---

### `palladium:powers`

Grants powers to the player on a per-slot basis. When the item is worn or held in the specified slot, the listed powers are granted.

Follows the same slot key and value format as [`palladium:render_layers`](#palladiumrender_layers).

```json
"palladium:powers": {
  "head": "mypack:flight",
  "curios:hat": "mypack:flight"
}
```

---

### `palladium:power_dampening`

Suppresses (dampens) specific powers on a per-slot basis. When the item is worn or held in the specified slot, the matched powers are prevented from activating. See [Power Dampening](/docs/powers/power-dampening) for what exactly happens and more examples.

The value is an object mapping slot keys to a **HolderSet** of powers. A HolderSet must be homogeneous: it can be either a list of direct IDs or a single tag, but **not a mix of both**:

```json
"palladium:power_dampening": {
  "*": "#palladium:is_magical"
}
```

```json
"palladium:power_dampening": {
  "chest": ["mypack:flight", "mypack:super_strength"]
}
```

To combine individual IDs and tags in a single slot, use the NeoForge compound HolderSet via `"type": "neoforge:or"`:

```json
"palladium:power_dampening": {
  "chest": {
    "type": "neoforge:or",
    "values": [
      "mypack:flight",
      "#palladium:is_magical"
    ]
  }
}
```

---

### `palladium:openable`

Gives the item an open/close state, used for animated wearables such as helmets with a visor. The open state is typically toggled by other systems (e.g. abilities or keybinds).

**Simple forms:**

```json
"palladium:openable": true
```
Enables the open/close state with no animation timer and no sounds.

```json
"palladium:openable": 10
```
Enables the open/close state with an animation timer of 10 ticks. The timer counts up to the given value when opening and back down to 0 when closing, which can be used to drive animations.

**Full object form:**

| Field           | Type                                                             | Default | Description                                                                                                                                                                                                                                                                        |
|-----------------|------------------------------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`       | Boolean                                                          | `true`  | Whether the open/close state is active.                                                                                                                                                                                                                                            |
| `time`          | Integer                                                          | `0`     | Duration in ticks for the open/close animation. `0` means no timer.                                                                                                                                                                                                                |
| `opening_sound` | Identifier                                                       | —       | Sound event to play when the item is opened. Optional.                                                                                                                                                                                                                             |
| `closing_sound` | Identifier                                                       | —       | Sound event to play when the item is closed. Optional.                                                                                                                                                                                                                             |
| `animation`     | Identifier or `{ "opening": Identifier, "closing": Identifier }` | —       | Player animation played on the wearer when the item is opened/closed. A single ID is used for both; the object form lets you pick one per direction (either may be omitted). Palladium ships `palladium:toggle_helmet`, which briefly raises the right hand to the head. Optional. |

```json
"palladium:openable": {
  "enabled": true,
  "time": 10,
  "opening_sound": "mypack:helmet_open",
  "closing_sound": "mypack:helmet_close",
  "animation": {
    "opening": "palladium:toggle_helmet",
    "closing": "mypack:helmet_slam"
  }
}
```
