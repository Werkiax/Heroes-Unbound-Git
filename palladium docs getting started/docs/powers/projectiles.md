---
sidebar_position: 3
---

# Projectiles

The `palladium:projectile` ability shoots an entity when it is enabled. In its simplest form you point it at any projectile entity type and it fires, so a working snowball thrower is only a few lines of JSON. If you want more than that, Palladium also ships a custom projectile entity that you can fully configure from the same ability: damage, gravity, explosions, hit actions, and how it looks.

If you are new to abilities in general, read the [Abilities](./abilities) page first. Everything below assumes you already know how to put an ability inside a power and give it a state.

## A simple projectile

Here is the whole thing. This power throws a snowball when the bound key is pressed.

```json title="data/<namespace>/palladium/power/<filename>.json"
{
  "name": "Snowball Thrower",
  "icon": "minecraft:snowball",
  "abilities": {
    "throw": {
      "type": "palladium:projectile",
      "entity_type": "minecraft:snowball",
      "state": {
        "enabling": {
          "type": "palladium:key_bind",
          "behaviour": "activation"
        }
      }
    }
  }
}
```

`entity_type` is the only field you need. It can be any registered projectile, vanilla or modded, for example `minecraft:arrow`, `minecraft:ender_pearl`, or `minecraft:snowball`.

## Ability options

Every field other than `entity_type` is optional and has a sensible default, so add only the ones you care about.

`entity_type` is the ID of the entity to shoot. It has to be a projectile. Defaults to `minecraft:snowball`.

`velocity` *(optional, default: `1.5`)* is how fast the projectile leaves the shooter. Higher values travel further and drop less over a given distance.

`inaccuracy` *(optional, default: `0`)* adds random spread to the shot. `0` fires perfectly straight along the look direction. Raise it for a shotgun-like scatter or to make an ability feel less precise.

`swinging_arm` *(optional, default: `main_arm`)* is the arm that swings when the projectile fires. Accepts `none`, `main_arm`, `off_arm`, `right_arm`, `left_arm`, and `both`.

`ignore_player_movement` *(optional, default: `false`)*. By default the shooter's current velocity is added to the projectile, so firing while running forward makes the shot a little faster. Set this to `true` to fire purely along the look direction and ignore how the player is moving.

`entity_data` *(optional)* is an NBT object applied to the spawned entity. This is where the custom projectile below reads all of its settings from, but it also works on vanilla entities if you want to set their NBT.

## The custom projectile

`minecraft:snowball` is fine when you just want a snowball. When you want to design your own projectile, use `palladium:custom_projectile` as the `entity_type` and describe it inside `entity_data`.

```json
"laser_shot": {
  "type": "palladium:projectile",
  "entity_type": "palladium:custom_projectile",
  "velocity": 3.0,
  "entity_data": {
    "damage": 8.0,
    "gravity": 0.0,
    "appearances": [
      { "type": "laser", "thickness": 0.05, "color": "#FF0000" }
    ]
  }
}
```

A custom projectile has no look of its own. On its own it is invisible. You give it one or more [appearances](#appearances) to make it show up, which is covered further down.

### Behaviour fields

All of these go inside `entity_data` and are optional.

| Field | Default | What it does |
|---|---|---|
| `damage` | `3.0` | Damage dealt to an entity on hit. Set to `0` for a projectile that deals no damage. |
| `damage_type` | thrown | Damage type ID used when hurting an entity, for example `minecraft:magic`. Falls back to the generic thrown damage type. |
| `gravity` | `0.03` | Downward pull per tick. `0.0` flies in a straight line, higher values arc and drop faster. |
| `size` | `0.1` | Width and height of the hitbox in blocks. |
| `lifetime` | `-1` | Ticks before the projectile removes itself. `-1` means it never times out on its own. |
| `die_on_entity_hit` | `true` | Whether the projectile is removed after hitting an entity. |
| `die_on_block_hit` | `true` | Whether the projectile is removed after hitting a block. |
| `prevent_shooter_interaction` | `false` | When `true`, the projectile passes through and ignores the entity that fired it. |
| `knockback_strength` | `0.0` | Extra knockback applied to an entity on hit. |
| `set_entity_on_fire_seconds` | `0` | Seconds of fire applied to an entity on hit. |
| `explosion_radius` | `0.0` | Radius of an explosion created on hit. `0` means no explosion. |
| `explosion_causes_fire` | `false` | Whether that explosion sets fires. |
| `explosion_interaction` | `none` | How the explosion treats blocks. One of `none`, `block`, `mob`, `tnt`, `trigger`. |

### Hit actions

Two optional lists let you run [actions](../logic/actions) at the moment of impact.

`entity_hit_actions` runs when the projectile hits an entity. The action context targets the entity that was hit.

`block_hit_actions` runs when the projectile hits a block. The context includes the position of the block that was hit.

```json
"entity_data": {
  "damage": 0.0,
  "entity_hit_actions": [
    { "type": "palladium:run_command", "command": "effect give @s minecraft:glowing 5" }
  ]
}
```

This is how you build projectiles that do something other than raw damage, like tagging a target, teleporting, or applying effects.

## Appearances

Appearances control what a `palladium:custom_projectile` looks like. `appearances` is a list, and every entry has a `type`. You can stack as many as you want, and they all render at once, so a projectile can be an item, leave particles, and drag a trail all at the same time.

### `item`

Renders an item model as the projectile.

```json
{ "type": "item", "item": "minecraft:stick" }
```

`item` is the item to display. It accepts a full item stack, so components work too.

### `particles`

Spawns particles both while the projectile flies and again in a small burst when it hits.

```json
{
  "type": "particles",
  "particle_type": "minecraft:flame",
  "amount": 3,
  "spread": 0.1
}
```

`particle_type` is the particle to spawn. `amount` *(default: `1`)* is how many per tick. `spread` *(default: `1.0`)* is how far they scatter from the projectile. `options` *(default: empty)* is an NBT object for particles that need extra data, such as `minecraft:dust`.

### `laser`

Draws a solid beam along the direction of travel. Pair it with `"gravity": 0.0` so the beam stays straight.

```json
{ "type": "laser", "thickness": 0.05, "color": "#FF0000" }
```

`thickness` is the width of the beam in blocks. `color` is a hex color string.

### `trail`

Leaves a trail behind the projectile using one or more trail definitions. Trails are their own resource, so you build the look of the trail once and reference it by ID here. See the [Trails](../rendering/trails) page for how to create them.

```json
{ "type": "trail", "trails": ["mypack:speed_streak"] }
```

`trails` is a list of trail identifiers. Because it is a list you can layer several trails on a single projectile.

### `renderLayer`

Renders one or more [render layers](../rendering/render-layers) on the projectile, the same system used for entities. This is the most flexible option and lets you use models and textures you already made for a power.

```json
{ "type": "renderLayer", "render_layers": ["mypack:my_projectile_model"] }
```

`render_layers` is a list of render layer identifiers.

## Examples

### Rapid-fire straight laser

No gravity, high velocity, short lifetime, and a bit of knockback. A clean beam attack that does not arc.

```json
"laser_beam": {
  "type": "palladium:projectile",
  "entity_type": "palladium:custom_projectile",
  "velocity": 3.0,
  "inaccuracy": 0.0,
  "entity_data": {
    "appearances": [
      { "type": "laser", "thickness": 0.05, "color": "#FF0000" }
    ],
    "damage": 8.0,
    "gravity": 0.0,
    "size": 0.1,
    "lifetime": 40,
    "knockback_strength": 1.5
  }
}
```

### Fireball

A flaming projectile that sets its target alight and can be tuned to blow up the ground it lands on.

```json
"fireball": {
  "type": "palladium:projectile",
  "entity_type": "palladium:custom_projectile",
  "velocity": 2.0,
  "entity_data": {
    "appearances": [
      { "type": "particles", "particle_type": "minecraft:flame", "amount": 3, "spread": 0.1 }
    ],
    "damage": 6.0,
    "gravity": 0.01,
    "size": 0.15,
    "set_entity_on_fire_seconds": 5,
    "explosion_radius": 2.0,
    "explosion_interaction": "block"
  }
}
```

### Thrown gadget with a trail

An item model that arcs like a real thrown object and leaves a trail. It passes through the thrower so it does not blow up in your face on release.

```json
"gadget": {
  "type": "palladium:projectile",
  "entity_type": "palladium:custom_projectile",
  "velocity": 2.5,
  "entity_data": {
    "appearances": [
      { "type": "item", "item": "minecraft:ender_pearl" },
      { "type": "trail", "trails": ["mypack:gadget_trail"] }
    ],
    "damage": 5.0,
    "gravity": 0.03,
    "size": 0.25,
    "lifetime": 100,
    "prevent_shooter_interaction": true,
    "die_on_block_hit": false
  }
}
```

### Non-damaging utility shot

Zero damage, no destruction, just an action on impact. Good for support powers like a healing bolt or a marker.

```json
"tag_shot": {
  "type": "palladium:projectile",
  "entity_type": "palladium:custom_projectile",
  "velocity": 2.5,
  "entity_data": {
    "appearances": [
      { "type": "particles", "particle_type": "minecraft:glow", "amount": 2, "spread": 0.1 }
    ],
    "damage": 0.0,
    "gravity": 0.0,
    "entity_hit_actions": [
      { "type": "palladium:run_command", "command": "effect give @s minecraft:glowing 10" }
    ]
  }
}
```
