---
sidebar_position: 2
---

# Tool Materials

Tool materials define the properties of tool-type items such as swords. They are referenced by their registry ID in item definitions.

To create a custom tool material, create a JSON file at:

```
addon/<namespace>/tool_material/<material_id>.json
```

For example, `addon/mypack/tool_material/emerald.json` registers the material `mypack:emerald`.

---

## Fields

All fields are required.

| Field                     | Type       | Description                                                                                    |
|---------------------------|------------|------------------------------------------------------------------------------------------------|
| `incorrect_blocks_for_drops` | Tag (Block) | Block tag for which this tool will **not** produce drops (e.g. `#minecraft:incorrect_for_iron_tool`). |
| `durability`              | Integer    | Maximum durability of items using this material.                                               |
| `speed`                   | Float      | Mining speed multiplier.                                                                       |
| `attack_damage_bonus`     | Float      | Bonus attack damage added on top of the base weapon damage.                                    |
| `enchantment_value`       | Integer    | Enchantability. Higher values yield better enchantments.                                       |
| `repair_items`            | Tag (Item) | Item tag whose members can be used to repair tools of this material in an anvil.               |

---

## Built-in Vanilla Materials

The following vanilla tool materials are pre-registered and can be referenced directly by ID:

| ID                    | `incorrect_blocks_for_drops`                    | `durability` | `speed` | `attack_damage_bonus` | `enchantment_value` | `repair_items`                        |
|-----------------------|-------------------------------------------------|--------------|---------|-----------------------|---------------------|---------------------------------------|
| `minecraft:wood`      | `#minecraft:incorrect_for_wooden_tool`          | 59           | 2.0     | 0.0                   | 15                  | `#minecraft:wooden_tool_materials`    |
| `minecraft:stone`     | `#minecraft:incorrect_for_stone_tool`           | 131          | 4.0     | 1.0                   | 5                   | `#minecraft:stone_tool_materials`     |
| `minecraft:iron`      | `#minecraft:incorrect_for_iron_tool`            | 250          | 6.0     | 2.0                   | 14                  | `#minecraft:iron_tool_materials`      |
| `minecraft:gold`      | `#minecraft:incorrect_for_gold_tool`            | 32           | 12.0    | 0.0                   | 22                  | `#minecraft:gold_tool_materials`      |
| `minecraft:diamond`   | `#minecraft:incorrect_for_diamond_tool`         | 1561         | 8.0     | 3.0                   | 10                  | `#minecraft:diamond_tool_materials`   |
| `minecraft:netherite` | `#minecraft:incorrect_for_netherite_tool`       | 2031         | 9.0     | 4.0                   | 15                  | `#minecraft:netherite_tool_materials` |

---

## Example

```json title="addon/mypack/tool_material/emerald.json"
{
  "incorrect_blocks_for_drops": "#minecraft:incorrect_for_diamond_tool",
  "durability": 1000,
  "speed": 10,
  "attack_damage_bonus": 2,
  "enchantment_value": 15,
  "repair_items": "#mypack:emerald_tool_materials"
}
```
