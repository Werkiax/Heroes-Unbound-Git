# Powers

Powers are the main feature of Palladium. They are essentially a collection of configured abilities that can be granted
to a player.
As they are datapack content, they go into `data` directory and can be reloaded by rejoining the world. The minimal
setup for a power would be:

```json title="data/<namespace>/palladium/power/<filename>.json"
{
  "name": "Example Power",
  "icon": "minecraft:command_block"
}
```

## Settings

| Field                  | Type                                                                              | Default | Required | Description                                                                                      |
|------------------------|-----------------------------------------------------------------------------------|---------|----------|--------------------------------------------------------------------------------------------------|
| `parent`               | Identifier                                                                        | —       | No       | ID of another power to mark it as a parent. More about that on "Parenting Powers"                |
| `name`                 | Text Component                                                                    | —       | **Yes**  | Display name shown in the power screen and tooltips. Supports Vanilla Minecraft text components. |
| `icon`                 | [Icon](/docs/rendering/icons)                                                     | —       | **Yes**  | Icon rendered in the power list and tree view.                                                   |
| `persistent_data`      | Boolean                                                                           | `false` | No       | When `true`, ability state (enabled/unlocked) is preserved across power removal and re-granting. |
| `hidden`               | Boolean                                                                           | `false` | No       | Hides the power from all UI. Useful for internal/system powers.                                  |
| `animation_controller` | Map\<[Animation Layer](/docs/rendering/animations#animation-layers), Identifier\> | —       | No       | Maps animation layers to animation controller IDs.                                               |
| `abilities`            | Map\<String, [Ability](/docs/powers/abilities)\>                                  | —       | No       | Named ability definitions. The key becomes the ability's internal ID within this power.          |
| `energy_bars`          | Map\<String, [EnergyBarConfiguration](#energy-bars)\>                             | —       | No       | Named energy bar definitions. The key is used when referencing bars from abilities.              |

## Abilities

Each entry in the `abilities` map is an ability definition. The map key is the ability's local ID
(scoped to this power).

```json
"abilities": {
  "my_ability": {
    "type": "palladium:flight",
    "properties": {...},
    "state": {...},
    "energy_bar_usage": [
    ...
    ]
  }
}
```

### `type`

The registry ID of the ability type (e.g. `palladium:flight`, `palladium:healing`,
`palladium:attribute_modifier`). This determines which fields are available beyond the shared ones
below. A list of all available types can be found [here](/docs/powers/abilities).

### `state`

Determines the lifecycle of the ability (when it is unlocked and enabled). Please read
the [Ability State Handlers](/docs/powers/state-handlers.mdx) page for more information.

### `properties`

Optional display and behavior configuration for the ability.

| Field             | Type                                        | Default      | Description                                                         |
|-------------------|---------------------------------------------|--------------|---------------------------------------------------------------------|
| `title`           | Text Component                              | —            | Custom display name. Falls back to the ability type's default name. |
| `icon`            | [Icon](/docs/rendering/icons)               | Barrier item | Icon shown in the ability list and bar.                             |
| `description`     | [Ability Description](#ability-description) | —            | Description shown in the ability tooltip. More below.               |
| `color`           | [Ability Color](#ability-color)             | `gray`       | Color of the frame in the ability bar.                              |
| `hidden_in_gui`   | Boolean                                     | `false`      | Hides the ability from the power screen.                            |
| `hidden_in_bar`   | Boolean                                     | `false`      | Hides the ability from the ability bar HUD.                         |
| `list_index`      | Integer                                     | `-1`         | Explicit position in the ability bar. `-1` = automatic.             |
| `animation_timer` | [Animation Timer](#animation-timer)         | —            | Controls how long the ability's animation blends in/out.            |
| `render_layer`    | List\<Identifier\>                          | `[]`         | Render layer IDs to activate while this ability is enabled.         |
| `allow_dampening` | Boolean                                     | `true`       | Whether [power dampening](power-dampening) can disable this ability. |

#### Ability Description

Can be a single text component, or 2 ones depending on if the ability is locked or not.

```json
"description": "Allows the player to fly."
```

```json
"description": {
  "locked": "You cannot fly yet.",
  "unlocked": "Allows the player to fly."
}
```

#### Ability Color

One of the 16 Minecraft dye color names (lowercase):
`white`, `orange`, `magenta`, `light_blue`, `yellow`, `lime`, `pink`, `gray`,
`light_gray`, `cyan`, `purple`, `blue`, `brown`, `green`, `red`, `black`

#### Animation Timer

Animation timers are used as a utility for animations and render layers. They control a timer that goes up to a certain
value once the ability is enabled, and decrease again once it's disabled. Some ability type also react to the animation timer (e.g. energy beams).  
Shorthand form (just max ticks):

```json
"animation_timer": 20
```

Full form:

```json
"animation_timer": {
  "min": 0,
  "max": 20,
  "easing": "linear"
}
```

`easing` can be one of the following.
How they differ and behave can be viewed [here](https://easings.net).

- `linear`
- `constant`
- `in_sine`, `out_sine`, `in_out_sine`
- `in_quad`, `out_quad`, `in_out_quad`
- `in_cubic`, `out_cubic`, `in_out_cubic`
- `in_quart`, `out_quart`, `in_out_quart`
- `in_quint`, `out_quint`, `in_out_quint`
- `in_expo`, `out_expo`, `in_out_expo`
- `in_circ`, `out_circ`, `in_out_circ`
- `in_back`, `out_back`, `in_out_back`
- `in_elastic`, `out_elastic`, `in_out_elastic`
- `in_bounce`, `out_bounce`, `in_out_bounce`

---

### `energy_bar_usage`

Declares which energy bars this ability consumes and by how much. Accepts a single object or a list.

| Field        | Type    | Description                                                                                                  |
|--------------|---------|--------------------------------------------------------------------------------------------------------------|
| `energy_bar` | String  | Key of the energy bar within this power, or `"namespace:power_id#bar_key"` to reference another power's bar. |
| `amount`     | Integer | Amount consumed per tick while the ability is active.                                                        |

```json
"energy_bar_usage": {"energy_bar": "stamina", "amount": 2}
```

```json
"energy_bar_usage": [
    {"energy_bar": "stamina", "amount": 2},
    {"energy_bar": "test:other_power#mana", "amount": 1}
]
```

## Energy Bars

Each entry in the `energy_bars` map defines a resource bar tracked per-player for this power.

```json
"energy_bars": {
  "stamina": {
    "max": 100,
    "color": "00aaff",
    "auto_increase_per_tick": 1,
    "auto_increase_interval": 10
  }
}
```

| Field                    | Type                                   | Default  | Description                                                                                  |
|--------------------------|----------------------------------------|----------|----------------------------------------------------------------------------------------------|
| `max`                    | Integer or [Value](/docs/logic/values) | —        | **Required.** Maximum value of the bar. Can be a static number or a dynamic [Value](#value). |
| `color`                  | Hex String                             | `ffffff` | Bar fill color as an RRGGBB hex string.                                                      |
| `synced_value`           | [Value](/docs/logic/values)            | —        | When set, the bar mirrors this external value instead of being managed by the system.        |
| `auto_increase_per_tick` | Integer                                | `0`      | Amount added to the bar automatically each interval.                                         |
| `auto_increase_interval` | Integer                                | `1`      | Ticks between each auto-increase step.                                                       |
| `visible`                | [Condition](/docs/logic/conditions)    | `true`   | Whether the bar is shown in the ability bar. The bar keeps working while hidden.             |

### Visibility

`visible` hides the bar from the ability bar while its conditions aren't met, e.g. until the ability using it is unlocked:

```json
"energy_bars": {
  "stinger": {
    "max": 8,
    "auto_increase_per_tick": 1,
    "auto_increase_interval": 20,
    "visible": {
      "type": "palladium:ability_unlocked",
      "ability": "stinger"
    }
  }
}
```

### Value

`max` and `synced_value` support Palladium's [`Value`](/docs/logic/values) system: a type that
allows dynamic computation. A plain integer is always valid:

```json
"max": 200
```

A dynamic value uses the standard type-dispatched object form:

```json
"max": { "type": "palladium:ability_tick_count", "ability": "stamina" }
```

## Custom Power Screen

The screen that opens when you press the button in your inventory is a [GUI layout](/docs/rendering/guis/), and every power
brings its own. When a player has multiple powers, each power's layout becomes a tab of that screen.

The layout for a power is resolved in three steps, in this order:

1. **The `screen_layout` field of the power's [power renderer](/docs/rendering/power-renderers).**
   If the renderer at `assets/<namespace>/palladium/power_renderers/<power_id>.json` sets `screen_layout`, that layout
   is used.
2. **The naming convention `<namespace>:power/<power_path>`.**
   If no `screen_layout` is set or if no power renderer exists, Palladium looks for a layout whose ID is the power's ID prefixed with `power/`. For the
   power `mypack:hero`, that is the layout `mypack:power/hero`, meaning the file
   `assets/mypack/palladium/ui_layouts/power/hero.json`.
3. **The built-in default `palladium:power/default`.**
   If neither of the above exists, the power uses the [default power layout](/docs/rendering/guis/layouts#palladiumpower/default),
   which shows the power's name at the top and the ability tree below it. How that tree is laid out can be changed with a [power tree](power-trees).

:::warning
Only step 2 falls back to the default. If `screen_layout` is set to an ID that does not resolve to an existing layout,
the power gets no tab in the power screen at all. Check the ID spelling if a power disappears from the screen.
:::