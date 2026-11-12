---
sidebar_position: 2
---

# Publishing
Once you are done with your pack you are ready to release. Usually you'd do that on CurseForge or Modrinth.
However, those 2 platforms don't have direct addon pack sections, neither do their launchers support them.  
But there is a workaround:

## Turning Addon Packs into Mods
You can make Forge and Fabric load your addon pack as a mod!  
**If you created your pack using the template generator, it will already have this enabled!**

All you need to do is the following:  

### Fabric Support
Add the following file to your pack:
```json title="fabric.mod.json"
{
  "schemaVersion": 1,
  "authors": [],
  "environment": "*",
  "name": "<Addon Pack Name>",
  "id": "<Addon Pack ID>",
  "version": "<Addon Pack Versio>",
  "description": "<Addon Pack Description>",
  "icon": "logo.png",
  "license": "All rights reserved"
}
```
Change the ID, name, version & description to your own, and Fabric will load your pack once it's located in your mods folder.


### Forge Support
Add the following file to your pack:
```toml title="META-INF/mods.toml"
modLoader = 'lowcodefml'
showAsResourcePack = false
loaderVersion="[47,)"
license="All rights reserved"

[[mods]]
modId="<Addon Pack ID>"
displayName="<Addon Pack Name>"
version="<Addon Pack Version>"
logoFile = "logo.png"
logoBlur = false
description='''
<Addon Pack Description>
'''

[[dependencies.test]]
modId = "palladium"
mandatory = true
versionRange = ""
ordering = "NONE"
side = "BOTH"
```
Change the ID, name, version & description to your own, and Forge will load your pack once it's located in your mods folder.