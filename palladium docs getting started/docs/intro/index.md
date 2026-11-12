# Getting Started

This category explains how to set up your Palladium Addon Pack. But before you start you should be familiar with the
following things:

- **JSON Format**
- Minecraft's data- & resource-packs
- Difference between addon pack, resource pack & data pack content, as explained below:

# Understanding Minecraft Packs

Addon Packs are similar to Resource- & Data Packs in terms of folder structure. They use the `addon` folder in the pack.
They are located in the `palladium/addonpacks` folder within your minecraft directory, and it's important to know that
addonpacks also load resource- & datapack content!
So you can ship textures, models, recipes, etc. within your addon pack file!  
Therefore, you need to understand what the difference between those 3 pack types are, how they work, and how they are
re-/loaded!

| Pack Type      | Reload Method                             | Examples                                                      | Explanation                                                                               | Folder Structure         |
|----------------|-------------------------------------------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------|--------------------------|
| Resource Packs | Pressing F3+T                             | Textures, Models, Language Files, etc.                        | Data that **only** the client needs (for rendering for example)                           | `assets/<namespace>/...` |
| Data Packs     | Rejoining the world/restarting the server | Crafting Recipes, Loot Tables, Advancements, **Powers**, etc. | Data that can be **server/world-specific** and is not neccessarily needed for your client | `data/<namespace>/...`   |
| Addon Packs    | Full game restart                         | Custom items, creative mode tabs, suit sets, etc.             | Data that is registered once when the game starts and can not be changed afterwards       | `addon/<namespace>/...`  |

This wiki will **not** cover how to create vanilla content (like crafting recipes). There are lots of existing tutorials and
tools that can help you.