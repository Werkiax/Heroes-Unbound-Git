# Special Render Layer Types

On the previous page about render layers you get to know how they work, where you need to place them, and what the basic type requires. However, Palladium comes with some special types.  
*"conditions" still work on all of them!*


## Skin Overlay
This render layer simply puts a texture directly above the player model, without you needing to define a model:
```json
{
    "type": "palladium:skin_overlay",
    "render_type": "solid",
    "texture": "namespace:textures/models/overlay.png"
}
```
`render_type` is **OPTIONAL**.  
`texture` is the path to your texture. You can also use a [dynamic setup](https://github.com/ThreeTAG/Palladium/wiki/Dynamic-Textures) for this.


## Lightning Sparks
This creates an animated lightning aura around your player.
```json
{
    "type": "palladium:lightning_sparks",
    "frequency": 0.5,
    "amount": 5,
    "core_color": "#ffffff",
    "glow_color": "#ffffff",
    "core_opacity": 1.0,
    "glow_opacity": 1.0,
    "thickness": 0.02,
    "normal_transparency": false
}
```
All of those settings are **OPTIONAL**.


## Thrusters
Creates animated flame-thrusters at your hands and feet, which react to flying.
```json
{
    "type": "palladium:thrusters",
    "color": "#ffffff",
    "right_arm": true,
    "left_arm": true,
    "right_leg": true,
    "left_leg": true
}
```
All of those settings are **OPTIONAL**.