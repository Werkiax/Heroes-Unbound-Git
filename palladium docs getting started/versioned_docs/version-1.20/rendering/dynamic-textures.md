# Dynamic Textures

Dynamic Textures a great way to make animated content in render layers, icons, and more. To create one, simple create a file like the following

```json title="assets/<namespace>/palladium/dynamic_textures/<filename>.json"
{
  "base": "namespace:textures/models/example_texture"
}
```
This one would simply just look for the texture, and not do anything special with it. To make it more *dynamic*, read the following chapters.  
If you plan to use this somewhere in your pack, you start your texture path with a `#`.  
To use this dynamic texture as an icon for an ability, instead of specifying the normal texture path, you use a `#` in
front of the path and make it lead to the dynamic texture ID (`#namespace:filename`).


## Texture Variables

The `base` setting is the texture we'll always start with when the game starts to produce this texture. There are those things called "texture variables". They allow you to get input from the entity and use it in your texture path. Let's use Palladium's variable for crouching:
```json
{
    "base": "namespace:textures/models/example_texture_#CROUCHING.png",
    "variables": {
        "CROUCHING": {
            "type": "palladium:crouching"
        }
    }
}
```
Now we get the data from the entity whether it's crouching or not. The `CROUCHING` key I used there is the one you can
use in the texture path starting with a `#`.  
Depending on the entity, the game will now look for `namespace:textures/models/example_texture_true.png` or
`namespace:textures/models/example_texture_false.png` (because it will replace `#CROUCHING` in the `base` path with `true`/`false`). 

If you don't want to add it to be replace with `true`/`false`, the `palladium:crouching` variable has extra settings which allow you to specify what the replacements in both cases would be. So this:

```json
{
    "base": "namespace:textures/models/example_texture#CROUCHING.png",
  // highlight-start
    "variables": {
        "CROUCHING": {
            "type": "palladium:crouching",
            "true_value": "_crouching",
            "false_value": ""
        }
    },
  // highlight-end
}
```
...will look for `namespace:textures/models/example_texture.png` (since I gave `false_value` an empty string) and `namespace:textures/models/example_texture_crouching.png`.

All texture variable types can be found in the `mods/documentation/palladium/dynamic_textures/texture_variables.html` file in your minecraft folder.

## Texture Transformers

There are also ways to let the game modify your texture. Those are called "texture transformers". So let's add an overlay on top of our current texture:

```json
{
    "base": "namespace:textures/models/example_texture#CROUCHING.png",
    "variables": {
        "CROUCHING": {
            "type": "palladium:crouching",
            "true_value": "_crouching",
            "false_value": ""
        }
    },
  // highlight-start
    "transformers": [
      {
        "type": "palladium:overlay",
        "overlay": "namespace:textures/models/example_overlay.png"
      }
    ]
  // highlight-end
}
```

Now this will put the texture specified in `overlay` on top of our `base` texture.   
And just as you can use texture variables in `output`, you can also use them in the transformers:

```json
{
    "base": "namespace:textures/models/example_texture#CROUCHING.png",
    "variables": {
        "CROUCHING": {
            "type": "palladium:crouching",
            "true_value": "_crouching",
            "false_value": ""
        }
    },
    "transformers": [
      {
        "type": "palladium:overlay",
        // highlight-start
        "overlay": "namespace:textures/models/example_overlay#CROUCHING.png",
        // highlight-end
      }
    ]
}
```

This change would make the game look for different overlays to put on your base texture, depending on if your entity is crouching or not.

All texture transformers can be found here: **_coming soon_**



You can add as many variables and transformers as you want. In the case of transformers, the order is important for the result. It will go through each from the start to the end and modify the texture in that order.

All that might seem complicated at first, but once you understand how it works you should be able to get pretty complex with this. Feel free to suggest any texture transformers and texture variables on issue tracker here if you need any for your dynamic render layer texture.