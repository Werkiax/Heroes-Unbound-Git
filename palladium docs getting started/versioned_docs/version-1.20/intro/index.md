# Getting Started

This category explains how to set up your Palladium Addon Pack. But before you start you should be familiar with the following things:
- **JSON Format**
- Minecraft's data- & resource-packs
- Difference between addon pack, resource pack & data pack content, as explained below:


# Understanding Minecraft Packs

Addon Packs are similar to Resource- & Data Packs in terms of folder structure. They use the `addon` folder in the pack.
They are located in the `addonpacks` folder within your minecraft directory, and a big difference here is that addon pack files can also be loaded as resource- & datapacks!
So you can ship textures, models, recipes, etc. within your addon pack file!  
Therefore, you need to understand what the difference between those 3 pack types are, how they work, and how they are
re-/loaded!

| Pack Type      | Reload Method                         | Content                                                                                                                      | Folder Structure         |
|----------------|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| Resource Packs | Pressing F3+T                         | Textures, Models, Language Files, etc.<br/>Just data that **only** the client needs (for rendering and such)                 | `assets/<namespace>/...` |
| Data Packs     | `/reload` Command                     | Crafting Recipes, Loot Tables, Advancements, **Powers**, etc.<br/>Data that can be **server/world-specific**                 | `data/<namespace>/...`   |
| Addon Packs    | None. Loads once when the game starts | Custom items, creative mode tabs, suit sets, etc.<br/>Data that need to be registered once and can not be changed afterwards | `addon/<namespace>/...`  |

Using addon packs you can create global data & resource packs that will apply to all worlds and can not be disabled. This wiki will not cover how to create vanilla content (like crafting recipes) though, there are lots of tutorials and tools already that can help you.