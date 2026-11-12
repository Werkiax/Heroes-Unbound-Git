# Render Layers

Before you start, you need to understand what render layers and model layers are and how they work.

A "model type" is simply a setting that defines what bones the corresponding model layer must have.  
Example: By default a render layer uses the `minecraft:humanoid` model type, which you'll most likely need.
It contains the following bones: `head`, `hat`, `body`, `right_arm`, `left_arm`, `right_leg`, `left_leg`.  
If you just want to make a model that fits your player, it's wise to not change the model_type.
You only really need to do it in extremely rare cases (like making a render layer that fits a pig).

A "model layer" is a file that defines the properties of a model. It contains all the **definitions** for the beforementioned bones.
As described above, the model type defines which bones are present, the model layer defines the properties of those bones.  
You make a model layer in BlockBench, for example. They utilize the Bedrock Entity Model format, and are stored in
`assets/<namespace>/palladium/model_layers/<filename>.json` in your pack.

A "render layer" then uses a model type and a model layer (and of course a texture) and renders it on the entity. They are stored in
`assets/<namespace>/palladium/render_layers/<filename>.json` in your pack.  

## Creating a Model Layer

For humanoid models, you can download [this BlockBench file](https://drive.google.com/uc?export=download&id=1-OpsTX7qKUv_zy03n5iCLDuVi9fz4JgG) if you want to model something on your own. Palladium uses the Bedrock Entity Model format, so you can just use the built-in system in BlockBench for that.  
In Blockbench you can see those groups/folders on the sidebar. Those are the bones! If you wish to add something to e.g. the player's arm, you need to add it to the `right_arm` or `left_arm` group.

![Inside BlockBench](https://i.imgur.com/SMVqxSn.png)

## Creating a Render Layer

After all that, you can finally create a proper render layer, a basic setup can look like this:

```json title="assets/<namespace>/palladium/render_layers/<filename>.json"
{
  "model_layer": "namespace:model_layer_name",
  "texture": "namespace:textures/models/example_texture.png"
}
```

You can see that `"model_type"` is missing. If you wish to make a render layer for players, you don't need to specify it.

If you want to make your layer glow, you can also change the render type:

```json title="assets/<namespace>/palladium/render_layers/<filename>.json"
{
  "model_layer": "namespace:model_layer_name",
  "texture": "namespace:textures/models/example_texture.png",
  "render_type": "glow"
}
```

Easy as that! After that, your render layer will be available under the ID `namespace:filename` for you to use in abilities.

## Compound Render Layer

If you want to define **multiple** render layers in **one** file, you can use the compound render layer type like this:

```json title="assets/<namespace>/palladium/render_layers/<filename>.json"
{
  "type": "palladium:compound",
  "layers": [
    {
      "model_layer": "namespace:layer_1_name",
      "texture": "namespace:textures/models/example_texture_1.png"
    },
    {
      "model_layer": "namespace:layer_2_name",
      "texture": "namespace:textures/models/example_texture_2.png",
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
  "model_layer": {
    "normal": "namespace:layer_name",
    "slim": "namespace:layer_name_slim"
  },
  "texture": {
    "normal": "namespace:textures/models/example_texture.png",
    "slim": "namespace:textures/models/example_texture_slim.png"
  }
}
```

Of course you don't need to use that all the 3 settings if you just have the texture dependent on the skin type.


## Advanced: Dynamic Textures

You can use any [dynamic texture](/versioned_docs/version-1.20/rendering/dynamic-textures.md) you have created by referencing it with `#`, but you can also define it directly in this render layer file:
```json
{
  "model_type": "minecraft:humanoid",
  "model_layer": "namespace:layer_name",
  "texture": {
    "base": "namespace:textures/models/example_texture#CROUCHING.png",
    "variables": {
      "CROUCHING": {
        "type": "palladium:crouching",
        "true_value": "_crouching",
        "false_value": ""
      }
    }
  }
}
```

## Advanced: Using the entity's texture

You can also use the entity's own texture on a model by you. Simply use this:
```json
"texture": "#entity"
```
If you don't want the overriden texture (by skin change abilities) and just the original/base one, use this:
```json
"texture": {
    "type": "palladium:entity",
    "ignore_skin_change": true
}
```