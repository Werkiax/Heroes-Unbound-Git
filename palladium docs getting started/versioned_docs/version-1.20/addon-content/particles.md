# Particles

## Setup
To get started and make your own particle type, create a json file like this:

```json title="addon/<namespace>/particle_types/<particle ID>.json"
{
  "lifetime": 60,
  "has_physics": false,
  "gravity": 0,
  "quad_size": 0.5,
  "render_type": "lit",
  "texture_type": "aging",
  "brightness": 240
}
```

`lifetime` is the amount of ticks the particle will live on for. 60 means that the particle will exist for 3 seconds. *(optional, fallback: 100)*

`has_physics` determines if the particle can collide with blocks in your world. *(optional, fallback: true)*

`gravity` determines the gravity factor. 0 means no gravity at all. Positive values will make the particle go down, zero ones will make it go up. *(optional, fallback: 0.02)*

`quad_size` determines the size of the particle texture. *(optional, fallback: 1)*

`brightness` determines the glow intensity of the particle. Needs the render type set to "lit"! Max is 240.  *(optional, fallback: -1)*

`render_type` determines how the particle is rendered. Possible values: "opaque", "translucent", "lit", "no_render". *(optional, fallback: opaque)*

`texture_type` determines how the textures are handled. More info in the bottom section. Possible values: "random", "aging".  *(optional, fallback: random)*


## Particle Texture File

To determine which textures can be used for your particle, you need to create an additional json file in the assets directory:  

```json title="assets/<namespace>/particles/<particle ID>.json"
{
  "textures": [
    "test:test_particle_0",
    "test:test_particle_1",
    "test:test_particle_2"
  ]
}
```

Depending on the `texture_type` you specified above, the textures will be chosen differently. `random` means that the particle will have one static texture during its lifetime, but it will be one random one from that list. If you choose `aging`, the particle will go from the top to the bottom texture through its lifetime.