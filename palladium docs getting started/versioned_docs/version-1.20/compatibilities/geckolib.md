# GeckoLib Render Layers
:::warning
Before you start with this, make sure to have read the page about render layers!
:::

With GeckoLib you can use their model format for render layers, and even use their animations for them!

For a basic understanding of how modelling for GeckoLib works, read their [wiki](https://github.com/bernie-g/geckolib/wiki/Getting-Started).

To get started create a render layer like this:
```json
{
  "type": "geckolib:default",
  "model": "test:geo/gecko_model_test.geo.json",
  "texture": "test:textures/models/gecko_model_test.png"
}
```
`model` needs to have the location of your model file. **IMPORTANT:** Your model needs to have the correct bones/groups in them for them to being applied to the player's body parts. The correct ones are `armorHead`, `armorBody`, `armorRightArm`, `armorLeftArm`, `armorRightLeg`, `armorLeftLeg`. You can define custom names for the bones if required, which is explained at the bottom of this page.

`texture` is the texture location for the model. You can use the extensive system of texture described on the main render layer page here.


## Adding animations
You can also make use of GeckoLib's animation system to animate certain new added parts of your model. If you want to add a looping one, you have to define an animation controller like in the example below. The "animation" part here is what defines what animation will be started with. If your animation is set to loop, this will of course loop forever. `transition_tick_time` is optional, but it defines the transition time (in ticks) between animations (in case you have set it up to having multiple using triggers, like in the next step).
```json
{
  "type": "geckolib:default",
  "model": "test:geo/gecko_model_test.geo.json",
  "texture": "test:textures/models/gecko_model_test.png",
  "animation_file": "test:animations/gecko_model_test.animation.json",
  "animation_controller": [
    {
      "name": "looping",
      "transition_tick_time": 10,
      "animation": "animation.model.loop"
    }
  ]
}
```

If you want to have an animation be started upon using an ability, you have to use the `geckolib:render_layer_animation` ability. You supply the render layer ID, the name of the controller, and the name of the trigger! Triggers are used for playing an animation, and they have to be defined in the controller like this:
```json
{
  "type": "geckolib:default",
  "model": "test:geo/gecko_model_test.geo.json",
  "texture": "test:textures/models/gecko_model_test.png",
  "animation_file": "test:animations/gecko_model_test.animation.json",
  "animation_controller": [
    {
      "name": "triggerable_controller",
      "triggers": {
        "test_trigger": "animation.model.extend_arm"
      }
    }
  ]
}
```
If you were to use this example json, you would need to use `test_trigger` as the trigger in the ability!


## Defining custom bone names
If you don't want to use the pre-defined bone names mentioned in the first step, you can tell the render layer to use custom ones like this:
```json
{
  "type": "geckolib:default",
  "model": "test:geo/gecko_model_test.geo.json",
  "texture": "test:textures/models/gecko_model_test.png",
  "animation_file": "test:animations/gecko_model_test.animation.json",
  "animation_controller": [
    {
      "name": "looping",
      "transition_tick_time": 10,
      "animation": "animation.model.loop"
    }
  ],
  "bones": {
    "head": "armorHead",
    "body": "armorBody",
    "right_arm": "armorRightArm",
    "left_arm": "armorLeftArm",
    "right_leg": "armorRightLeg",
    "left_leg": "armorLeftLeg"
  }
}
```
