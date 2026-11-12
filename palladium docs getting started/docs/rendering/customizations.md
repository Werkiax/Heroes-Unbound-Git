---
sidebar_position: 3
---

# Customizations

Customizations are a system that lets players visually change the appearance of their character, for example choosing between different suit styles or colour variants, through an in-game selection screen. Each option is a customization entry that points to a render layer, and they are grouped into categories.

Both customizations and their categories are datapack content.

---

## Customization Categories

A category groups related customizations together in the selection screen. Create a category file at:

```
data/<namespace>/palladium/customization_category/<id>.json
```

### Fields

All fields are optional.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `sort_index` | Integer | `100` | Controls the order of the category in the UI. Lower values appear first. |
| `requires_selection` | Boolean | `false` | When `true`, one option in this category must always be active. Requires `default` to also be set. |
| `default` | Identifier | — | The customization used as the default selection when `requires_selection` is `true`. |
| `hidden_by_equipment` | String | — | The category is hidden while an item occupies this slot. One of: `mainhand`, `offhand`, `head`, `chest`, `legs`, `feet`, `body`, `saddle`. |
| `visibility` | Condition | always visible | A [Condition](/docs/logic/conditions) that controls whether this category is shown to the player at all. |
| `preview` | Object | — | Adjusts the camera position used in the preview. See below. |

### Preview

The `preview` object configures how the player model is framed in the customization screen preview.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `scale` | Float | `1.0` | Zoom level of the preview camera. |
| `translation` | `[x, y, z]` | `[0, 0, 0]` | Offset applied to the camera position. |
| `rotation` | `[x, y, z]` | `[15, 40, 0]` | Rotation of the preview camera. |

### Category Icon

The icon shown in the selection screen is loaded automatically from:

```
assets/<namespace>/textures/gui/customization_categories/<category_id>.png
```

### Example

```json title="data/mypack/palladium/customization_category/suit_style.json"
{
  "sort_index": 10,
  "requires_selection": true,
  "default": "mypack:mark_3",
  "visibility": {
    "type": "palladium:has_power",
    "power": "mypack:iron_man"
  },
  "preview": {
    "scale": 1.2,
    "translation": [0, 0.5, 0],
    "rotation": [15, 40, 0]
  }
}
```

---

## Customizations

A customization is a single selectable option within a category. Create customization files at:

```
data/<namespace>/palladium/customization/<id>.json
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `category` | Identifier | Yes | The category this customization belongs to. |
| `name` | Text Component | No | Display name shown in the UI. Defaults to a translation key derived from the customization's ID (`customization.<namespace>.<path>`). |
| `render_layer` | Identifier or Object | No | The render layer shown when this customization is active. If omitted, defaults to a render layer at `<namespace>:customization/<path>`. |
| `trail` | Identifier or Identifier[] | No | [Trail](/docs/rendering/trails) configuration(s) rendered on the player while this customization is active. |
| `unlockable` | Boolean | No | When `true`, this option can be unlocked or locked via the `/palladium customization` command. Defaults to `false`. |

### `render_layer`

The `render_layer` field accepts either a plain render layer ID, or an object that specifies a different layer for the in-screen preview:

```json
"render_layer": "mypack:customization/mark_3"
```

```json
"render_layer": {
  "main": "mypack:customization/mark_3",
  "preview": "mypack:customization/mark_3_preview"
}
```

If the field is omitted entirely, Palladium looks for a render layer whose ID matches `<namespace>:customization/<customization_id_path>`. So `mypack:mark_3` would automatically use `mypack:customization/mark_3`.

### `trail`

One or more [trail](/docs/rendering/trails) IDs (`assets/<namespace>/palladium/trails/`). They render whenever the customization is selected and its category is visible and not hidden by equipment, same as the render layer.

```json
"trail": "mypack:aura"
```

```json
"trail": ["mypack:aura", "mypack:sparks"]
```

### Examples

```json title="data/mypack/palladium/customization/mark_3.json"
{
  "category": "mypack:suit_style",
  "render_layer": "mypack:customization/mark_3"
}
```

```json title="data/mypack/palladium/customization/mark_42.json"
{
  "category": "mypack:suit_style",
  "name": "Mark XLII",
  "render_layer": {
    "main": "mypack:customization/mark_42",
    "preview": "mypack:customization/mark_42_preview"
  },
  "trail": "mypack:aura",
  "unlockable": true
}
```

---

## Command

Customizations with `"unlockable": true` can be granted to or removed from players using the `/palladium customization` command. If no entity is specified, the command targets the executing player.

```
/palladium customization unlock <customization> [<entity>]
/palladium customization lock <customization> [<entity>]
```

Requires operator-level permissions (game master).
