# Armor Renderers

**Before you start with this page, make sure to have checked [Custom Items](/versioned_docs/version-1.20/addon-content/items.md) and the `items.html` file in
your Palladium-documentation folder.**

If you've created an armor piece in your pack, it won't display on your actual player. To do so, you have to create an
armor renderer file for it. The path for it is equivalent to the ID of your item, so as an example:  
Item ID: `namespace:example_chestplate`  
Armor Renderer File Path: `assets/namespace/palladium/armor_renderers/example_chestplate.json`

The file itself can then look like this:

```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png"
}
```

This simple setup will then give your armor the texture specified, with the default vanilla model.

To use a custom model, just add this:

```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png",
  "model_layers": "palladium:humanoid#suit"
}
```

In this example I use a model layer that is built into Palladium which makes it skin-tight, so you can use this aswell.

## Hide the player's second layer

Sometimes the 2nd layer of the player skin might force to make your armor model too thick, but you can simply make it
invisible by adding this:

```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png",
  "model_layers": "palladium:humanoid#suit",
  "hide_second_layer": true
}
```

Or even use conditions, to have it disappear in certain scenarios:

```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png",
  "model_layers": "palladium:humanoid#suit",
  "hide_second_layer": {
    "type": "palladium:on_ground"
  }
}
```

## Attaching Render Layers

If you followed the render layer tutorial, you can also attach render layers to your armor renderer.  
You can either add ones you have created externally in other files:
```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png",
  "model_layers": "palladium:humanoid#suit",
  "render_layers": [
    "namespace:my_cool_render_layer",
    "namespace:my_second_cool_render_layer"
  ]
}
```

Or you create them directly in this file:
```json
{
  "textures": "namespace:textures/models/armor/example_chestplate.png",
  "model_layers": "palladium:humanoid#suit",
  "render_layers": [
    {
      "model_layer": "namespace:layer_name",
      "texture": "namespace:textures/models/example_texture.png",
      "render_type": "glow"
    }
  ]
}
```


## Advanced: Skin Typed Models/Textures

If you have made models for the player before, you might have noticed that one model or texture might not always fit
both skin types. For that you can make models and texture depend on the skin type like this:

```json
{
  "textures": {
    "normal": "namespace:textures/models/armor/example_chestplate.png",
    "slim": "namespace:textures/models/armor/example_chestplate_slim.png"
  },
  "model_layers": {
    "normal": "palladium:humanoid#suit",
    "slim": "palladium:humanoid#suit_slim"
  }
}
```

# Advanced: Openable Armor Pieces

In the settings for the armor piece you might have seen the `openable` setting which you can enable. If you do so, your
armor piece can be opened by the player. For this case you can easily define textures:

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "open": "namespace:textures/models/armor/example_chestplate_open.png"
  },
  "model_layers": "palladium:humanoid#suit"
}
```

If you've also set the `opening_time` to something beyond 0, you can now also define a texture for each tick/frame (it
starts at 1, as 0 is the closed state). Let's say you have set it to 5:

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "open_1": "namespace:textures/models/armor/example_chestplate_open_1.png",
    "open_2": "namespace:textures/models/armor/example_chestplate_open_2.png",
    "open_3": "namespace:textures/models/armor/example_chestplate_open_3.png",
    "open_4": "namespace:textures/models/armor/example_chestplate_open_4.png",
    "open_5": "namespace:textures/models/armor/example_chestplate_open_5.png"
  },
  "model_layers": "palladium:humanoid#suit"
}
```

If you want, you can also do that with the model (fully optional):

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "open_1": "namespace:textures/models/armor/example_chestplate_open_1.png",
    "open_2": "namespace:textures/models/armor/example_chestplate_open_2.png",
    "open_3": "namespace:textures/models/armor/example_chestplate_open_3.png",
    "open_4": "namespace:textures/models/armor/example_chestplate_open_4.png",
    "open_5": "namespace:textures/models/armor/example_chestplate_open_5.png"
  },
  "model_layers": {
    "default": "namespace:humanoid#example_chestplate",
    "open_1": "namespace:humanoid#example_chestplate_open_1",
    "open_2": "namespace:humanoid#example_chestplate_open_2",
    "open_3": "namespace:humanoid#example_chestplate_open_3",
    "open_4": "namespace:humanoid#example_chestplate_open_4",
    "open_5": "namespace:humanoid#example_chestplate_open_5"
  }
}
```

You can also use dynamic textures to simplify this for the textures:

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "open": {
      "base": "namespace:textures/models/armor/example_chestplate_open_#X.png",
      "variables": {
        "X": {
          "type": "palladium:openable_equipment_progress"
        }
      }
    }
  },
  "model_layers": "palladium:humanoid#suit"
}
```

Skin-types definitions are also still possible in any of these cases:

```json
{
  "textures": {
    "default": {
      "normal": "namespace:textures/models/armor/example_chestplate.png",
      "slim": "namespace:textures/models/armor/example_chestplate_slim.png"
    },
    "open": {
      "normal": {
        "base": "namespace:textures/models/armor/example_chestplate_open_#X.png",
        "variables": {
          "X": {
            "type": "palladium:openable_equipment_progress"
          }
        }
      },
      "slim": {
        "base": "namespace:textures/models/armor/example_chestplate_slim_open_#X.png",
        "variables": {
          "X": {
            "type": "palladium:openable_equipment_progress"
          }
        }
      }
    }
  },
  "model_layers": "palladium:humanoid#suit"
}
```

## Advanced: Conditional textures/models

You can also make textures or models dependent on certain states. Let's say we want a different texture and model when
the player is crouching, so we define those different states first:  
**Unless you use the skin-typed "normal"/"slim" settings, a "default" texture/model must always be present!**

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "crouching": "namespace:textures/models/armor/example_chestplate_crouching.png"
  },
  "model_layers": {
    "default": "palladium:humanoid#suit",
    "crouching": "palladium:humanoid#suit_crouching"
  }
}
```

Now you have put down a different texture and model under a "crouching" key, we can now use those to define conditions
and use those states:

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "crouching": "namespace:textures/models/armor/example_chestplate_crouching.png"
  },
  "model_layers": {
    "default": "palladium:humanoid#suit",
    "crouching": "palladium:humanoid#suit_crouching"
  },
  "conditions": [
    {
      "texture": "crouching",
      "model_layer": "crouching",
      "if": {
        "type": "palladium:crouching"
      }
    }
  ]
}
```

That's it! You can also add multiple of those, and make model and texture depend on different conditions. In this
example, the texture changes on crouching, but the model changes when being under water:

```json
{
  "textures": {
    "default": "namespace:textures/models/armor/example_chestplate.png",
    "crouching": "namespace:textures/models/armor/example_chestplate_crouching.png"
  },
  "model_layers": {
    "default": "palladium:humanoid#suit",
    "under_water": "palladium:humanoid#suit_under_water"
  },
  "conditions": [
    {
      "texture": "crouching",
      "if": {
        "type": "palladium:crouching"
      }
    },
    {
      "model_layer": "under_water",
      "if": {
        "type": "palladium:under_water"
      }
    }
  ]
}
```