---
sidebar_position: 4
---

# Animations

Palladium uses [PlayerAnimationLibrary](https://modrinth.com/mod/player-animation-library) under the hood to animate the player model. Animations are defined in the **GeckoLib animation format**, which can be authored in [Blockbench](https://www.blockbench.net/) using the **GeckoLib plugin** and its *GeckoLib Animated Model* model type.

Rather than playing a single static animation, most powers need to react to what the player is doing: play an idle pose while standing still, switch to a running cycle when sprinting, or trigger an attack animation when an ability fires. That is what **animation controllers** are for.

An animation controller is a **state machine** defined in a JSON file. You declare a set of named states, each playing one animation. Then you define **transitions** between them: conditions that are checked every tick, causing the controller to switch to a different state when they become true. At any given moment the controller is in exactly one state, playing its assigned animation.

For example, a simple movement controller might have three states: `idle`, `running`, and `jumping`. From `idle` it transitions to `running` when the player starts sprinting, and to `jumping` when they leave the ground. Each of those states can then transition back to `idle` once the condition no longer holds.

Animation controllers are assigned to a power per **layer** (movement, idle, or special). Each layer runs independently, so a power can have a movement controller and a special controller active at the same time without them interfering.

---

## Animations

Animation files are placed at:

```
assets/<namespace>/player_animations/<name>.animation.json
```

The resource ID of an individual animation is determined by the animation's name inside the file itself, for example an animation named `hero_idle` in the `mypack` namespace is referenced as `mypack:hero_idle`.

Within an animation controller you reference an animation by that ID:

```json
"animation": "mypack:hero_idle"
```

You can also define named shortcuts in the `animations` map (see [Animation References](#animation-references) below) and reference them with a `#` prefix:

```json
"animation": "#idle"
```

---

## Animation Controllers

Animation controller files are client-side content placed at:

```
assets/<namespace>/palladium/animation_controllers/<id>.json
```

For example, `assets/mypack/palladium/animation_controllers/hero_movement.json` is referenced as `mypack:hero_movement`.

### Controller Types

Controllers come in types, chosen with the `type` field. Without `type`, the [default state machine](#default-state-machine) is used.

| Type                  | Description                                                                              |
|-----------------------|------------------------------------------------------------------------------------------|
| `palladium:default`   | State machine with states and transitions. Full control, used when `type` is omitted.    |
| `palladium:triggered` | One-shot animations fired by conditions, no states to write. See [Triggered](#triggered). |

Fields shared by all types:

| Field              | Type                      | Default | Description                                                                                                 |
|--------------------|---------------------------|---------|-------------------------------------------------------------------------------------------------------------|
| `type`             | Identifier                | default | The controller type.                                                                                        |
| `parent`           | Identifier                |         | Inherit from another controller of the same type. See [Inheritance](#inheritance).                          |
| `animations`       | Map\<String, Identifier\> | `{}`    | Named animation shortcuts. Keys are used as `#name` references. A list of IDs picks a random one each time. |
| `blend_transition` | Integer (ticks)           | `5`     | How many ticks to blend between animations when switching. `0` switches instantly.                          |

### Default (state machine)

| Field           | Type                 | Default | Description                                          |
|-----------------|----------------------|---------|------------------------------------------------------|
| `initial_state` | String               |         | The state the controller starts in.                  |
| `states`        | Map\<String, State\> | `{}`    | The states of this controller. Keys are state names. |

### States

Each entry in `states` defines one step in the state machine.

| Field              | Type                     | Default           | Description                                                                            |
|--------------------|--------------------------|-------------------|----------------------------------------------------------------------------------------|
| `animation`        | String                   | `palladium:empty` | The animation to play while in this state. Accepts a full ID or a `#key` reference.    |
| `blend_transition` | Integer (ticks)          |                   | Overrides the controller's `blend_transition` when switching into this state.          |
| `transitions`      | Map\<String, Condition\> | `{}`              | Conditions that move the controller to another state. Keys are the target state names. |

Transitions are evaluated in definition order every tick. The first condition that passes triggers an immediate state change.

### Minimal example

```json title="assets/mypack/palladium/animation_controllers/hero_movement.json"
{
  "initial_state": "idle",
  "blend_transition": 10,
  "states": {
    "idle": {
      "animation": "mypack:hero_idle",
      "transitions": {
        "running": "query.is_sprinting() && query.is_on_ground()"
      }
    },
    "running": {
      "animation": "mypack:hero_run",
      "transitions": {
        "idle": "query.is_sprinting() == false || query.is_on_ground() == false"
      }
    }
  }
}
```

Here is what this controller does, step by step:

- **`initial_state: "idle"`**: when the controller first becomes active, it starts in the `idle` state.
- **`blend_transition: 10`**: when switching between states, the two animations are blended together over 10 ticks (half a second) so the transition looks smooth instead of snapping.
- **`idle` state**: plays `mypack:hero_idle`. Every tick it checks whether the player is sprinting *and* on the ground. If both are true, the controller moves to the `running` state.
- **`running` state**: plays `mypack:hero_run`. Every tick it checks whether the player has stopped sprinting *or* has left the ground. If either is true, the controller moves back to `idle`.

The result is a controller that smoothly switches between an idle and a running animation based on what the player is doing.

### Animation References

The top-level `animations` map lets you give short names to animation IDs so you can reuse or override them (especially useful with inheritance):

```json
{
  "animations": {
    "idle": "mypack:hero_idle",
    "run":  "mypack:hero_run"
  },
  "initial_state": "idle",
  "states": {
    "idle": {
      "animation": "#idle",
      "transitions": { "running": "query.is_sprinting()" }
    },
    "running": {
      "animation": "#run",
      "transitions": { "idle": "query.is_sprinting() == false" }
    }
  }
}
```

### Triggered

`"type": "palladium:triggered"` is for one-shot animations: give it animations and the conditions that fire them. Each trigger plays its animation once when its condition becomes true, then waits until the condition is false again before it can fire again. Looping animations are not suitable here, since the controller waits for the animation to finish.

| Field      | Type                       | Default | Description                                                                                                                              |
|------------|----------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------|
| `triggers` | Map\<Animation, Condition\> | `{}`    | Keys are animation IDs or `#name` references, values are [conditions](/docs/logic/conditions). Earlier entries win when several are true. |

```json title="assets/mypack/palladium/animation_controllers/hero_special.json"
{
  "type": "palladium:triggered",
  "animations": {
    "attack": "mypack:hero_attack"
  },
  "triggers": {
    "#attack": {
      "type": "palladium:ability_enabled",
      "ability": "mypack:hero#attack"
    },
    "mypack:hero_land": "query.is_on_ground() && palladium.fall_distance() > 3"
  }
}
```

Internally this is the same state machine as the default type (idle → playing → finished → idle), so everything that applies to transitions applies here too.

### Inheritance

Use `parent` to inherit from another controller of the same type. The child's own values override anything from the parent, which is useful for creating variants without duplicating the full definition: the default type merges `states`, the triggered type merges `triggers`, both merge `animations`.

```json title="assets/mypack/palladium/animation_controllers/hero_elite_movement.json"
{
  "parent": "mypack:hero_movement",
  "animations": {
    "run": "mypack:hero_elite_run"
  }
}
```

Here everything is inherited from `mypack:hero_movement`, but the `#run` animation reference is swapped out for the elite variant.

---

## Transitions & Conditions

Transitions are a map where each key is a target state name and the value is a [Condition](/docs/logic/conditions). Two formats are supported:

### MoLang (string)

A plain string is treated as a **MoLang expression**. The expression must evaluate to a truthy number (`!= 0`):

```json
"transitions": {
  "running": "query.is_sprinting() && query.is_on_ground()",
  "jumping": "query.is_on_ground() == false"
}
```

Useful MoLang queries for animation controllers:

| Query                                 | Description                                                                         |
|---------------------------------------|-------------------------------------------------------------------------------------|
| `query.is_on_ground()`                | `1.0` when the player is standing on the ground.                                    |
| `query.is_sprinting()`                | `1.0` when the player is sprinting.                                                 |
| `query.is_moving()`                   | `1.0` when the player has non-zero horizontal velocity.                             |
| `palladium.any_animation_finished()`  | `1.0` on the tick the current animation finishes. Use to chain one-shot animations. |
| `palladium.flight_speed_forward()`    | Forward flight speed (useful in flight controllers).                                |
| `palladium.flight_speed_sideways()`   | Lateral flight speed.                                                               |
| `palladium.flight_propulsion_scale()` | Propulsion scale of the current flight type (e.g. boost).                           |
| `math.abs(x)`                         | Absolute value, handy for checking sideways speed.                                  |

All available queries are listed on the [MoLang](/docs/logic/molang#query-reference) page.

### Palladium Condition

Any [Palladium condition type](/docs/logic/conditions) works as well. Use a JSON object with a `"type"` field:

```json
"transitions": {
  "attacking": {
    "type": "palladium:ability_enabled",
    "ability": "mypack:hero#attack"
  }
}
```

### AND / list conditions

You can pass a **list** to require multiple conditions simultaneously:

```json
"transitions": {
  "sprint_jump": [
    "query.is_sprinting()",
    "query.is_on_ground() == false"
  ]
}
```

---

## Adding Controllers to Powers

Animation controllers are assigned to powers through [power renderers](/docs/rendering/power-renderers). Inside a power renderer file, use the `animation_controller` field to map one or more layers to animation controller IDs:

```json title="assets/mypack/palladium/power_renderers/hero.json"
{
  "animation_controller": {
    "movement": "mypack:hero_movement",
    "special":  "mypack:hero_special"
  }
}
```

The power renderer file must have the same resource ID as the power it belongs to. For example, the power at `data/mypack/palladium/power/hero.json` is paired with the renderer at `assets/mypack/palladium/power_renderers/hero.json`. See [Power Renderers](/docs/rendering/power-renderers) for more details.

Only the layers you specify are affected. Other layers continue to run whatever the next active power (or the defaults) provide.

If multiple active powers define a controller for the same layer, the controller from the more dominant power takes effect.

### Animation Layers

Palladium registers three independent animation layers on the player model that powers can use. Each layer runs its own controller and they stack on top of each other by priority; higher-priority layers win when bones conflict.

| Layer    | Key        | Priority | Purpose                                                        |
|----------|------------|----------|----------------------------------------------------------------|
| Movement | `movement` | 500      | Locomotion animations (walking, running, jumping).             |
| Idle     | `idle`     | 1000     | Ambient standing / idle animations.                            |
| Special  | `special`  | 2000     | Ability-triggered animations (attacks, transformations, etc.). |

:::note
The **Special** layer automatically shows the third-person player model in first-person view whenever a non-empty animation is playing. This means animations on this layer are visible to the player themselves without any extra setup.
:::

---

## Examples

### One-shot ability animation

A common pattern is triggering a single-play animation when an ability is active, then returning to the default state once it finishes. The `idle` state waits until the ability is enabled, then transitions to `attack`. Once the attack animation plays through, `palladium.any_animation_finished()` fires and the controller returns to `idle`.

```json
{
  "initial_state": "idle",
  "states": {
    "idle": {
      "transitions": {
        "attack": {
          "type": "palladium:ability_enabled",
          "ability": "mypack:hero#attack"
        }
      }
    },
    "attack": {
      "animation": "mypack:hero_attack",
      "transitions": {
        "idle": "palladium.any_animation_finished()"
      }
    }
  }
}
```
