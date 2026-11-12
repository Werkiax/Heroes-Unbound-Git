---
sidebar_position: 1
---

# Power Renderers

Power renderers are client-side definitions that control the visual presentation of a power on an entity. They can replace the entity's model entirely, activate [render layers](/docs/rendering/render-layers), show [trails](/docs/rendering/trails), display [HUD layouts](#hud-layouts), hide parts of the player model, and assign [animation controllers](/docs/rendering/animations).

Power renderer files are asset-side content, placed at:

```
assets/<namespace>/palladium/power_renderers/<id>.json
```

The file's resource ID must match the ID of the power it belongs to. For example, the power `data/mypack/palladium/power/hero.json` is paired with the renderer at `assets/mypack/palladium/power_renderers/hero.json`.

---

## Fields

All fields are optional.

| Field                  | Type                                                                              | Default         | Description                                                                                                                                                                                                                                                  |
|------------------------|-----------------------------------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entity_renderer`      | [Entity Renderer](#entity-renderer)                                               |                 | Replaces the entity's model with a custom one.                                                                                                                                                                                                               |
| `screen_layout`        | Identifier                                                                        | see description | ID of the [screen layout](/docs/rendering/guis/) used for the power screen. When unset, the layout `<namespace>:power/<power_path>` is used if it exists, otherwise `palladium:power/default`. See [Custom Power Screen](/docs/powers/#custom-power-screen). |
| `render_layers`        | [Conditional ID Map](#conditional-id-maps)                                        | `[]`            | Render layer IDs to activate while this power is active.                                                                                                                                                                                                     |
| `trails`               | [Conditional ID Map](#conditional-id-maps)                                        | `[]`            | Trail IDs to activate while this power is active.                                                                                                                                                                                                            |
| `hud_layouts`          | [Conditional ID Map](#conditional-id-maps)                                        | `[]`            | [Screen layouts](/docs/rendering/guis/) rendered as HUD overlays while this power is active. See [HUD Layouts](#hud-layouts).                                                                                                                                |
| `hidden_model_parts`   | Map\<String, [Condition](/docs/logic/conditions)\>                                | `{}`            | Player model parts to hide. Keys are part names, values are conditions controlling when they are hidden.                                                                                                                                                     |
| `animation_controller` | Map\<[Animation Layer](/docs/rendering/animations#animation-layers), Identifier\> | `{}`            | Maps animation layers to animation controller IDs. See [Animations](/docs/rendering/animations).                                                                                                                                                             |
| `ability_bar_textures` | Identifier or Map\<String, Texture Reference\>                                    | Palladium's     | Custom sprites for the ability bar HUD. See [Ability Bar Textures](#ability-bar-textures).                                                                                                                                                                  |

### Conditional ID Maps

The `render_layers` and `trails` fields accept two formats:

**Simple list** (always active):

```json
"render_layers": [
  "mypack:hero_suit",
  "mypack:hero_cape"
]
```

**Map with conditions** (each entry has its own condition controlling when it is active):

```json
"render_layers": {
  "mypack:hero_suit": {
    "type": "palladium:ability_enabled",
    "ability": "mypack:hero#toggle"
  },
  "mypack:hero_cape": true
}
```

---

## HUD Layouts

The `hud_layouts` field renders [screen layouts](/docs/rendering/guis/) as in-game HUD overlays for the local player. Each entry references a layout from `assets/<namespace>/palladium/ui_layouts/`, shown while the power is active and the entry's condition passes.

HUD rendering differs from opening the same layout as a screen:

- **The layout is placed by its size and alignment.** Omit `width`/`height` (see [Auto Size](/docs/rendering/guis/layouts#auto-size)) to span the whole screen, the usual setup for HUDs: widget [alignments](/docs/rendering/guis/widgets#positioning) then anchor directly to the screen corners and edges, with the layout's `padding` as margin from the screen edges. A layout with a fixed size renders as a box of that size, positioned by the layout's [`alignment`](/docs/rendering/guis/layouts#alignment) field (default centered).
- **The layout background is not drawn.** If you want panels behind HUD elements, build them from `colored_rectangle` or `blit` widgets.
- **There is no mouse.** Buttons render but cannot be clicked, tooltips never show, and hover states stay inactive.

Everything else works as usual, including per-widget `visibility` conditions, which are re-evaluated continuously. Since the map's conditions are also checked every frame, you can toggle whole HUDs with abilities:

```json title="assets/mypack/palladium/power_renderers/hero.json (excerpt)"
"hud_layouts": {
  "mypack:hero_hud": {
    "type": "palladium:ability_enabled",
    "ability": "mypack:hero#helmet_hud"
  }
}
```

---

## Ability Bar Textures

The ability bar HUD is drawn from individual sprites, so each piece can be replaced on its own. Sprites are regular GUI sprites and live in `assets/<namespace>/textures/gui/sprites/`; they are referenced by their sprite ID (the path inside that folder, without `.png`).

`ability_bar_textures` accepts two formats:

**Folder** – every sprite is taken from the given folder, using the names listed below:

```json
"ability_bar_textures": "mypack:hero_bar"
```

With this, e.g. the `slot_enabled` sprite is loaded from `assets/mypack/textures/gui/sprites/hero_bar/slot_enabled.png`. Sprites that are missing from the folder fall back to Palladium's default ones.

**Map** – only the listed sprites are replaced, everything else keeps Palladium's default. Values are texture references: a plain ID is a sprite ID, a [dynamic texture](dynamic-textures) (`#namespace:id`) is used as a full texture of the sprite's size instead.

```json
"ability_bar_textures": {
  "slot_enabled": "mypack:hero_bar/slot_enabled",
  "slot_cooldown": "#mypack:animated_cooldown"
}
```

Palladium's own sprites are at `assets/palladium/textures/gui/sprites/ability_bar/` and can be used as templates. Legacy 256×256 ability bar textures are converted automatically: on every resource reload Palladium splits every loaded texture whose path contains `ability_bar` (outside `textures/gui/sprites/`) into sprites under `<game dir>/palladium/converted/ability_bars/<namespace>/<texture path>/` and logs where they went in the addon pack log. Move that folder into `assets/<namespace>/textures/gui/sprites/` and reference it via the folder form.

| Sprite                                                                                                                 | Size   | Description                                                                 |
|------------------------------------------------------------------------------------------------------------------------|--------|-----------------------------------------------------------------------------|
| `power_indicator_top_left`, `power_indicator_top_right`, `power_indicator_bottom_left`, `power_indicator_bottom_right` | 52×28  | Background of the power icon / list switch key, one per screen corner.      |
| `ability_list`                                                                                                         | 24×112 | Background behind the five ability slots.                                   |
| `single_ability`                                                                                                       | 24×24  | Background used when the bar collapses to a single ability.                 |
| `slot_empty`                                                                                                           | 18×18  | Slot without an ability.                                                    |
| `slot_disabled`                                                                                                        | 18×18  | Unlocked ability that is currently off.                                     |
| `slot_enabled`                                                                                                         | 18×18  | Unlocked ability that is currently on. Also fills up during activation.     |
| `slot_locked`                                                                                                          | 18×18  | Locked ability background.                                                  |
| `slot_lock`                                                                                                            | 18×18  | Lock icon drawn over `slot_locked`.                                         |
| `slot_cooldown`                                                                                                        | 18×18  | Cooldown indicator, revealed from left to right.                            |
| `switch_key_forward`, `switch_key_backward`                                                                            | 8×8    | Arrow next to the list switch key.                                          |
| `key_jump`                                                                                                             | 10×5   | Key hint for jump-bound abilities.                                          |
| `key_mouse_left`, `key_mouse_right`, `key_mouse_middle`                                                                | 5×7    | Key hints for mouse-bound abilities.                                        |
| `key_mouse_scroll_up`, `key_mouse_scroll_down`                                                                         | 5×10   | Key hints for scroll-bound abilities.                                       |
| `key_gui`                                                                                                              | 8×9    | Key hint for abilities used by clicking them in the power screen.           |
| `energy_bar`                                                                                                           | 10×112 | Energy bar background.                                                      |
| `energy_bar_fill`                                                                                                      | 4×106  | Energy bar fill, tinted with the energy bar's color and revealed bottom-up. |
| `slot_<color>`                                                                                                         | 24×24  | Frame around a slot, one per [ability color](/docs/powers/#ability-color).  |

---

## Minimal Example

A simple power renderer that activates a render layer and a trail, and assigns an animation controller on the "movement" layer:

```json title="assets/mypack/palladium/power_renderers/hero.json"
{
  "render_layers": [
    "mypack:hero_suit"
  ],
  "trails": [
    "mypack:hero_trail"
  ],
  "animation_controller": {
    "movement": "mypack:hero_movement"
  }
}
```

---

## Entity Renderer

The `entity_renderer` field replaces the entity's default model with a custom 3D model. This is useful for transformation effects, alternate forms, or completely custom character models.

### Fields

| Field                    | Type                                            | Default                      | Description                                                                                                               |
|--------------------------|-------------------------------------------------|------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `model_layer`            | Skin Typed Value                                |                              | **Required.** The model layer location to use for the custom model.                                                       |
| `texture`                | Texture (Reference)                             |                              | **Required.** The texture to apply to the model.                                                                          |
| `first_person`           | [First Person Settings](#first-person-settings) | default arm bones, scale `1` | Controls which bones are shown in first person and their scale.                                                           |
| `item_bones`             | [Item Bones](#item-bones)                       | default arm/head bones       | Specifies which bones held items and head items are attached to.                                                          |
| `transition`             | [Transition Settings](#transition-settings)     |                              | Configures animated transitions when the model appears or disappears.                                                     |
| `conditions`             | [Condition](/docs/logic/conditions)             | always true                  | Condition that must pass for this entity renderer to be active.                                                           |
| `apply_vanilla_movement` | Boolean                                         | `false`                      | When `true`, vanilla movement animations (walking, swimming, etc.) are applied to the model.                              |
| `bone_mapping`           | Map\<String, String\>                           | `{}`                         | Maps bone names in the model to different equivalent vanilla player names. Useful if `apply_vanilla_movement` is enabled. |
| `enable_hand_items`      | Boolean                                         | `true`                       | Whether held items are rendered on the custom model.                                                                      |
| `enable_head_item`       | Boolean                                         | `true`                       | Whether the head item (e.g. helmet) is rendered on the custom model.                                                      |

### First Person Settings

Controls how the custom model appears in first-person view.

| Field        | Type   | Default       | Description                                          |
|--------------|--------|---------------|------------------------------------------------------|
| `right_bone` | String | `"right_arm"` | The bone rendered for the right arm in first person. |
| `left_bone`  | String | `"left_arm"`  | The bone rendered for the left arm in first person.  |
| `scale`      | Float  | `1.0`         | Scale multiplier for the first-person arm model.     |

### Item Bones

Specifies which bones in the custom model held items and head items are attached to.

| Field       | Type   | Default       | Description                                               |
|-------------|--------|---------------|-----------------------------------------------------------|
| `right_arm` | String | `"right_arm"` | The bone that right-hand items are attached to.           |
| `left_arm`  | String | `"left_arm"`  | The bone that left-hand items are attached to.            |
| `head`      | String | `"head"`      | The bone that head items (helmets, etc.) are attached to. |

### Transition Settings

Transitions let you smoothly blend the custom model in and out instead of having it pop in instantly. You can optionally play a one-shot animation during the transition (e.g. a transformation animation).

| Field                    | Type       | Default | Description                                                                                  |
|--------------------------|------------|---------|----------------------------------------------------------------------------------------------|
| `in_duration`            | Time       | `0`     | How long the transition-in takes. Accepts ticks or time strings (`"1s"`, `"20t"`).           |
| `out_duration`           | Time       | `0`     | How long the transition-out takes.                                                           |
| `in_animation`           | Identifier |         | Animation to play during the transition in.                                                  |
| `out_animation`          | Identifier |         | Animation to play during the transition out.                                                 |
| `show_during_transition` | Boolean    | `false` | When `true`, the custom model is visible during the transition (not just after it finishes). |
| `animation_out_blend`    | Time       | `0`     | Blend time for the out-animation. Controls how smoothly the animation fades out.             |

### Example

```json title="assets/mypack/palladium/power_renderers/hulk.json"
{
  "entity_renderer": {
    "model_layer": "mypack:bulky_player#main",
    "texture": "mypack:textures/entity/hulk.png",
    "apply_vanilla_movement": true,
    "first_person": {
      "right_bone": "right_arm",
      "left_bone": "left_arm"
    },
    "transition": {
      "in_duration": "3s",
      "out_duration": "3s",
      "in_animation": "mypack:hulk_transformation_in"
    },
    "conditions": {
      "type": "palladium:ability_enabled",
      "ability": "mypack:hulk#transform"
    }
  },
  "render_layers": [
    "mypack:hulk_armor"
  ]
}
```
