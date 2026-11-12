# Items

To create custom items using addonpacks, you have to create a file for them in `addon/<namespace>/items/<item ID>.json`.
After that check the items.html file (which is located in your local `mods/documentation/palladium` folder) for all the settings you can add onto your item, this wiki page will not cover them.


## Required assets
If you load the game up now, you will notice that your item has no model/texture. To provide that you need to create following file:  
```json title="assets/<namespace>/models/item/<item ID>.json"
{
  "parent": "minecraft:item/generated",
  "textures": {
    "layer0": "test:item/example_item"
  }
}
```
`test:item/example_item` would be the path to your item texture.


## Placements in Creative Mode Tabs
If you want to place your item in a creative mode tab, there are multiple ways.  
If the tab is your own, you can directly list your item in the creative mode tab json file, or you set the creative mode tab ID in the item json file like this:
```json
"creative_mode_tab": "example:my_creative_tab"
```

You can however also place it into Vanilla's tabs at precise positions, like this:

```json
"creative_mode_tab": {
   "tab": "minecraft:food_and_drinks",
   "after": "minecraft:bread"
}
```
This would place it into the foods-tab AFTER bread. The reverse is also possible:
```json
"creative_mode_tab": {
   "tab": "minecraft:food_and_drinks",
   "before": "minecraft:bread"
}
```


You can also combine all of the above into an array and place it into multiple tabs:
```json
"creative_mode_tab": [
   "example:my_creative_tab",
   {
      "tab": "minecraft:food_and_drinks",
      "after": "minecraft:bread"
   }
]
```
