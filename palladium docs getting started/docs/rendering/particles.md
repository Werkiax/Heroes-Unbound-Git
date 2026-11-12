---
sidebar_position: 5
---

# Particles

Particles are the small sprites the game scatters around for things like flames, smoke or magic dust. Palladium lets you register your own particle types from a pack, so you can spawn custom looking particles from abilities, beams and emitters without writing a single line of Java.

A custom particle is made of two halves that live in different places:

- A **definition** that tells the game how the particle behaves (how long it lives, whether it falls, how big it is). This half works on both the server and the client.
- A **sprite list** plus the actual **texture files**, which only matter on the client, since that is where things get drawn.

Once both halves exist, your particle shows up in the `particle_type` registry under `namespace:name` and can be used anywhere the game accepts a particle.

## Creating a Particle

### Particle file

The behavior file goes in the `addon` part of your pack:

```json title="addon/<namespace>/particle_type/<name>.json"
{
  "render_type": "translucent",
  "texture_type": "random",
  "lifetime": 40,
  "has_physics": false,
  "gravity": 0.0,
  "quad_size": 0.15,
  "fullbright": true,
  "color": "#b47bff"
}
```

The file name is the particle's name. The example above registers a particle you can reference as `<namespace>:<name>`.

Every field is optional, so an empty `{}` is a valid particle. The defaults are tuned to be a plain, floating, medium-sized sprite.

#### Settings

`render_type` *(optional, default: `opaque`)* controls how the sprite is blended:

- `opaque` draws the texture solid. Fully transparent pixels are cut out, but partial transparency is not smoothed. This is the cheaper option and it is what most vanilla particles use.
- `translucent` respects partial transparency, so soft edges and faded pixels blend into the world. Use this for glows, smoke and anything with a soft falloff.

`texture_type` *(optional, default: `random`)* decides how the particle picks a sprite when the sprite list has more than one entry:

- `random` picks one sprite at spawn and keeps it for the particle's whole life.
- `aging` walks through the list as the particle ages, showing the first sprite when it spawns and the last one right before it dies. This is how you make an animated particle, for example an ember that cools down.

`lifetime` *(optional, default: `100`)* is how many ticks the particle lives before it disappears. 20 ticks is one second.

`has_physics` *(optional, default: `true`)* when `true`, the particle collides with blocks instead of passing through them.

`gravity` *(optional, default: `0.0`)* is how strongly the particle is pulled down each tick. Positive values fall, `0.0` floats in place, and a negative value like `-0.02` makes the particle drift upward, which is handy for embers and bubbles.

`friction` *(optional, default: `0.98`)* is how much of its speed the particle keeps every tick. `1.0` never slows down, lower values bleed off motion faster so the particle settles quickly.

`quad_size` *(optional, default: `0.2`)* is the size of the sprite in blocks. `0.1` is a small speck, `1.0` is a large puff. The number is roughly the width of the sprite in the world.

`fullbright` *(optional, default: `false`)* when `true`, the particle ignores world lighting and always renders at full brightness. Turn this on for glowing effects so they stay bright in a dark cave.

`color` *(optional)* tints the sprite. Because the tint multiplies the texture, a **white or grey texture takes the colour best**. You can write it as a hex string (`"#b47bff"`), as an RGB list (`[180, 123, 255]`) or as a packed integer. Leave it out to draw the texture at its own colours.

`override_limiter` *(optional, default: `false`)* when `true`, the particle is allowed to spawn even when the player's particle setting is turned down. Use this sparingly, and only for particles that are important to gameplay.

### Sprite file

The client needs to know which textures a particle is allowed to use. That list lives in the `assets` part of your pack, in the vanilla particle format:

```json title="assets/<namespace>/particles/<name>.json"
{
  "textures": [
    "<namespace>:<texture file name>"
  ]
}
```

The file name here has to match the particle name from step 1. Each entry points at a texture, so `test:magic_dust` resolves to the file at `assets/test/textures/particle/magic_dust.png`.

For an `aging` particle, list the frames in order from youngest to oldest. For example:

```json title="assets/<namespace>/particles/ember.json"
{
  "textures": [
    "mypack:ember_0",
    "mypack:ember_1",
    "mypack:ember_2"
  ]
}
```

### The textures

Finally, drop the actual images in:

```
assets/<namespace>/textures/particle/<file>.png
```

Particle textures are small, usually 8x8 or 16x16 pixels, and support transparency. If you plan to `color` the particle, paint the texture white so the tint reads cleanly.

## Examples

### Floating magic dust

A soft, glowing speck for a wizard style power. It hangs in the air, glows in the dark and is tinted purple. The texture is a plain white dot, so the `color` field does the work.

```json title="addon/test/particle_type/magic_dust.json"
{
  "render_type": "translucent",
  "texture_type": "random",
  "lifetime": 40,
  "has_physics": false,
  "gravity": 0.0,
  "quad_size": 0.15,
  "fullbright": true,
  "color": "#b47bff"
}
```

### Rising embers

An animated particle that drifts upward and cools as it ages. The negative gravity lifts it, and `aging` swaps through three frames that fade from bright orange to dark red.

```json title="addon/test/particle_type/ember.json"
{
  "render_type": "translucent",
  "texture_type": "aging",
  "lifetime": 30,
  "has_physics": true,
  "gravity": -0.02,
  "friction": 0.96,
  "quad_size": 0.2,
  "fullbright": true
}
```

### Falling ash

A heavier, solid particle that obeys gravity and lands on the ground. No glow and no tint, so it stays dim and grounded like real ash.

```json title="addon/test/particle_type/falling_ash.json"
{
  "render_type": "opaque",
  "texture_type": "random",
  "lifetime": 120,
  "has_physics": true,
  "gravity": 0.04,
  "friction": 0.99,
  "quad_size": 0.1
}
```

All three of these ship in the example pack, wired to the power `test:custom_particle_test`, if you want to see them in game.
