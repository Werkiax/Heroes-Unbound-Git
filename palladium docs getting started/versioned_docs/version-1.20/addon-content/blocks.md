# Blocks

To create custom blocks using addonpacks, you have to create a file for them in `addon/<namespace>/blocks/<block ID>.json`.
After that check the blocks.html file (which is located in your local `mods/documentation/palladium` folder) for all the settings you can add onto your block, this wiki page will not cover them.


## Required assets
If you load the game up now, you will notice that your block has no model, no texture, and no name. To provide all that you need to create following files:

### Block State File
The blockstate file defines the different models a block can use depending on its blockstate. Right now you can only add basic blocks with just one default blockstate, so your blockstate file will look like this, at `assets/<namespace>/blockstates/<block ID>.json`:
```json title="assets/<namespace>/blockstates/<block ID>.json"
{
  "variants": {
    "": {
      "model": "test:block/test_stone"
    }
  }
}
```
`test:block/test_stone` equates to `assets/test/models/block/test_stone.json` and is the location of the model file we will create in the next step. So change this to your required location.


### Block Model File
To create a model file for a basic cube, create the file that you specified in the last step, and make it look like this:
```json title="assets/<namespace>/models/block/<block ID>.json"
{
  "parent": "minecraft:block/cube_all",
  "textures": {
    "all": "test:block/test_stone"
  }
}
```
`test:block/test_stone` equates to `assets/test/textures/block/test_stone.png` and is the texture of your block. Change this to your texture location.

**You can also create a custom block model using BlockBench and put it here.**


### Item Model File
Every block has an item. And every item has its own model aswell! To create one create the file `assets/<namespace>/models/item/<block ID>.json` and have it look like this:
```json title="assets/<namespace>/models/item/<block ID>.json"
{
  "parent": "test:block/test_stone"
}
```
`test:block/test_stone` is the location of your block model, so make sure to put in the **same location as in the blockstate file!** You can however also make a unique item model for the block in BlockBench if you desire so.


## Optional data files
Following files are optional, but will most likely be relevant for some blocks you want to create.

### Loot Table
With a loot table file you can define the drops of your block. Have it located at `data/<namespace>/loot_tables/blocks/<block ID>.json`. Loot Tables can be quite complicated, so I'd advise checking the Minecraft wiki or other sources of information. If you just want to create a basic drop I'd suggest taking the json from a Vanilla one and changing the values. You can find all of them [here](https://mcasset.cloud/1.19.2/data/minecraft/loot_tables/blocks).

### Tags
There are a bunch of tags in the game that define certain behaviours of blocks. How to create and use tags will not be explained here, check the Minecraft wiki. For blocks the most relevant are the ones that define the required tool level for breaking them (`minecraft:mineable/needs_stone_tool`, `minecraft:mineable/needs_iron_tool`, and so on) and the ones that define the tool (`minecraft:mineable/pickaxe`, `minecraft:mineable/shovel`, and so on).