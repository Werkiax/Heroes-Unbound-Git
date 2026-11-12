# Size Changing

Size change types define how an entity's size transitions from one value to another. They control the duration, easing curve, size bounds, how size affects movement and combat, and optional trail effects played during the transition.

A size change type is referenced by its identifier (e.g. `palladium:default`) and can be used by commands, abilities, and actions.

Palladium includes one built-in type: `palladium:default` (20-tick `in_cubic` ease, bounds `0.0625` to `16`).

## Creating a Size Change Type

Size change types are defined as JSON files at:

```json title="data/<namespace>/palladium/size_change_type/<filename>.json"
{
  "duration": 20,
  "min_size": 0.0625,
  "max_size": 16,
  "easing": "in_cubic",
  "attributes": {
    "minecraft:jump_strength": 0.5,
    "minecraft:entity_interaction_range": {
      "scaling": 1.5,
      "operation": "add_value"
    }
  },
  "trails": []
}
```

`duration` *(optional, default: `20`)* is the number of ticks the size transition takes. Set to `0` for an instant change.

`min_size` *(optional, default: `0.0625`)* is the smallest size multiplier this type permits. Any target value below this will be clamped up.

`max_size` *(optional, default: `16`)* is the largest size multiplier this type permits. Any target value above this will be clamped down.

`trails` *(optional)* is a list of trail identifiers that play on the entity while the transition is in progress.

```json
"trails": ["mypack:shrink_effect", "mypack:size_particles"]
```

`easing` *(optional, default: `"linear"`)* controls the shape of the transition curve. The following values are available:

| Value                                           | Description               |
|-------------------------------------------------|---------------------------|
| `linear`                                        | Constant speed throughout |
| `in_sine` / `out_sine` / `in_out_sine`          | Sine-based curve          |
| `in_quad` / `out_quad` / `in_out_quad`          | Quadratic curve           |
| `in_cubic` / `out_cubic` / `in_out_cubic`       | Cubic curve               |
| `in_quart` / `out_quart` / `in_out_quart`       | Quartic curve             |
| `in_quint` / `out_quint` / `in_out_quint`       | Quintic curve             |
| `in_expo` / `out_expo` / `in_out_expo`          | Exponential curve         |
| `in_circ` / `out_circ` / `in_out_circ`          | Circular curve            |
| `in_back` / `out_back` / `in_out_back`          | Overshoot curve           |
| `in_elastic` / `out_elastic` / `in_out_elastic` | Elastic bounce at the end |
| `in_bounce` / `out_bounce` / `in_out_bounce`    | Bounce curve              |

`in_*` eases start slow and accelerate. `out_*` eases start fast and decelerate. `in_out_*` combines both. How they look can be viewed at [easings.net](https://easings.net/).

## Attribute Scaling

`attributes` *(optional)* controls how much the entity's size affects its attributes. Each entry has a `scaling` factor, where `0` means size has no effect on that attribute, and `1` means it scales fully in proportion to size. Values above `1` exaggerate the effect; negative values invert it.

```json
"attributes": {
  "minecraft:safe_fall_distance": 1.0,
  "minecraft:entity_interaction_range": {
    "scaling": 1.5,
    "operation": "add_value"
  }
}
```

`scaling` is the factor described above.
`operation` *(optional, default: `"add_multiplied_total"`)* is how the scaled size is applied: `add_value`, `add_multiplied_base` or `add_multiplied_total`, the same operations attribute modifiers use. The amount applied is `(size - 1) × scaling`, so a size of `1` never changes anything. With the default operation a plain number can be used as a shorthand.

In the example above, a `3×` entity gets a `3×` safe fall distance and `+3` blocks of entity interaction range, while a `0.5×` entity only has half the safe fall distance and loses `0.75` blocks of reach.

When multiple size change types are active at once, each type contributes only its own share, and the factors combine multiplicatively, the same way the size multipliers themselves stack.

Attributes the entity doesn't have are skipped.

### Movement and Combat

The following attributes scale fully with size by default. Set their `scaling` to `0` to turn this off. With the default operation they are applied directly instead of as attribute modifiers, so they are not limited by the attribute's maximum value.

`minecraft:movement_speed` scales walking/movement speed. At `1`, a `2×` entity walks twice as fast; a `0.5×` entity walks half as fast. This also scales the sprint-jump horizontal boost.

`minecraft:jump_strength` scales jump launch velocity. Note that jump *height* scales with velocity squared, so at `1` a `2×` entity jumps roughly `4×` as high. For jump height proportional to size instead, use about `0.5`.

`minecraft:gravity` scales gravity. Keeping this equal to the jump strength scaling keeps airtime constant across sizes, so jumps feel consistent (large entities feel heavy, small ones snappy) instead of floaty or twitchy. This also affects falling speed.

`minecraft:attack_damage` scales the entity's melee attack damage. At `1`, a `2×` entity deals double attack damage.

## Molecular Instability

Size change types in the `#palladium:causes_molecular_instability` tag can't keep an entity resized for long. Whenever such a type resizes an entity, it gets the *Molecular Instability* effect, which lasts 30 seconds by default (`molecular_instability_duration` in the server config). Resizing it again restarts the timer. Once the effect runs out or is removed, all modifiers of these size change types transition back to `1`, bringing the entity back to its normal size.

```json title="data/palladium/tags/palladium/size_change_type/causes_molecular_instability.json"
{
  "values": ["mypack:shrink_ray"]
}
```

Entities wearing a full set of armor in the `#palladium:prevents_molecular_instability` item tag are protected and don't get the effect, so they can stay resized as long as they want.

```json title="data/palladium/tags/item/prevents_molecular_instability.json"
{
  "values": ["mypack:suit_helmet", "mypack:suit_chestplate", "mypack:suit_leggings", "mypack:suit_boots"]
}
```

## Via Command

`/palladium size set <entities> <size> [type]` and `/palladium size change <entities> <size> [type]` both apply a size modifier to the target entities, transitioning to the given value using the specified type. If `[type]` is omitted, `palladium:default` is used.

`/palladium size reset <entities>` instantly clears all active size modifiers and restores the entity to its base size with no transition.

`/palladium size reset <entities> <type>` removes only the modifier for the given type, smoothly transitioning back to `1.0` using that type's duration and easing.

`/palladium size query <entity>` reports the entity's current combined size multiplier.

`/palladium size query <entity> <type>` reports the current value of the specified modifier alone.

## Via Ability

The `palladium:size` ability applies a size modifier while the ability is enabled and automatically reverts it when the ability is disabled. See the [Abilities](./abilities) page for how to set up abilities in general.

```json
"shrink": {
  "type": "palladium:size",
  "size": 0.5,
  "size_change_type": "palladium:default"
}
```

`size` is the target size multiplier.
`size_change_type` is the identifier of the size change type defining the transition.

## Via Action

Two actions are available for use in action-based flows. See the [Actions](../logic/actions) page for how to set up actions in general.

**`palladium:change_size`** applies a size modifier, transitioning to the target value using the type's duration and easing. The modifier persists until explicitly removed.

```json
{
  "type": "palladium:change_size",
  "size_change_type": "palladium:default",
  "size": 2.0
}
```

**`palladium:set_size`** instantly sets the entity's size and clears all active size modifiers. The type's `min_size` and `max_size` are still used to clamp the value, but there is no transition.

```json
{
  "type": "palladium:set_size",
  "size_change_type": "palladium:default",
  "size": 2.0
}
```
