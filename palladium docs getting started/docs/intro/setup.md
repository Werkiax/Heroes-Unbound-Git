---
sidebar_position: 1
---

# Set up your Pack
To auto-generate your basic pack structure, you can use [this](https://squirrelcontrol.threetag.net/template-generator) generator. It will cover the pack.mcmeta and all necessary folders.

If you wish to set it up by hand, continue reading:

Create a folder (or zip file) in your `palladium/addonpacks` folder. The first thing you will need to add is a `pack.mcmeta` file inside it, structured like this:

```json title="pack.mcmeta"
{
  "pack": {
    "description": "<small description>",
    "pack_format": 8
  }
}
```

`description` is as the name says, a small description of your addon pack.

`pack_format` is for Minecraft to know if the pack suits the current resource pack format, more on that [here](https://minecraft.fandom.com/wiki/Pack_format).

Using this setup your pack will already load, however with no content. You can now start reading other pages to add the content you'd like.