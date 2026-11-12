---
sidebar_position: 1
---

# Setup your Pack
To auto-generate your basic pack structure, you can use [this](https://squirrelcontrol.threetag.net/template-generator) generator. It will cover the pack.mcmeta and all necessary folders.

If you wish to set it up by hand, continue reading:

Create a folder (or zip file) in your `addonpacks` folder. The first thing you will need to add is a `pack.mcmeta` file inside it, structured like this:

```json title="pack.mcmeta"
{
  "pack": {
    "id": "<unique id of your pack>",
    "description": "<small description>",
    "pack_format": 8,
    "version": "1.0.0.0"
  }
}
```

`id` must be a unique identifier for your pack. Other packs will be able to use this to make dependencies on your pack (More on that down below). Make sure the id is full lower-case and does not contain spaces (Example: `"my_cool_pack"`).

`description` is as the name says, a small description of your addon pack.

`pack_format` is for Minecraft to know if the pack suits the current resource pack format, more on that [here](https://minecraft.fandom.com/wiki/Pack_format).

`version` is also very important when it comes to other packs depending on your packs. Witj each release you should increase this number. I would suggest [Forge](https://forge.gemwire.uk/wiki/Semantic_Versioning)'s convention of how to structure the version number.

## Dependencies (optional)
Sometimes you want to use features of extra mods or even addon packs within your own one. To make sure the end-user has those installed and does not run into any issues, you can add dependencies into your `pack.mcmeta`.

```json title="pack.mcmeta"
{
  "pack": {
    "id": "<unique id of your pack>",
    "description": "<small description>",
    "pack_format": 8,
    "version": "1.0.0.0"
  },
  // highlight-start
  "dependencies": {
    "common": {
      "minecraft": ">=1.30",
      "palladium": ">=4.0.0",
      "pack:another_awesome_pack": ">=1.0.2"
    },
    "forge": {
      "curios": "*"
    },
    "fabric": {
      "trinkets": ">=3.3.0"
    }
  },
  // highlight-end
}
```

Since Palladium works on Forge & Fabric, you can make dependencies on both sides or either one of them, just use `common`, `forge` or `fabric`. Inside those section you declare the mod or pack id (pack IDs need to be prefixed with `pack:`) and a version range. If you want to allow ANY version of a mod/pack just use `"*"`.