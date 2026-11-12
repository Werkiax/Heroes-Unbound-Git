# Assigning Powers to Items

## Via Data Component

Powers can be granted to a player based on what items they are wearing or holding, using the `palladium:powers` data component on an item.

The component maps equipment slots to one or more power IDs. The power is active as long as the item is in the matching slot.

```json title="addon/mypack/item/power_ring.json"
{
  "type": "minecraft:item",
  "properties": {
    "components": {
      "palladium:powers": {
        "mainhand": "mypack:super_strength",
        "offhand": "mypack:super_strength"
      }
    }
  }
}
```

```json title="addon/mypack/item/spider_suit.json"
{
  "type": "minecraft:armor",
  "armor_material": "mypack:spider_silk",
  "armor_type": "chestplate",
  "properties": {
    "components": {
      "palladium:powers": {
        "chest": ["mypack:wall_crawling", "mypack:spider_sense"]
      }
    }
  }
}
```

For a full description of the component format, valid slot keys, and how to target multiple slots at once, see the [Data Components](/docs/items/data-components#palladiumpowers) page.

---

## Suit Sets

Powers can also be granted when a player is wearing a complete [suit set](../items/suit-sets). Unlike the component approach above, this checks that all pieces of the set are worn at the same time.

These files are datapack content, placed in the `data` directory:

```
data/<namespace>/palladium/suit_set_power/<id>.json
```

| Field      | Type       | Description                                                                        |
|------------|------------|------------------------------------------------------------------------------------|
| `suit_set` | Identifier | The registry ID of the suit set.                                                   |
| `power`    | HolderSet  | The powers to grant. Can be a tag (e.g. `#mypack:spider_powers`) or a list of IDs. |

The `power` field is a homogeneous HolderSet, so a plain array can only contain direct IDs or a single tag, not both mixed. To combine them, use `"type": "neoforge:or"` as described on the [Data Components](../items/data-components#palladiumpower_dampening) page.

### Examples

Single power ID:

```json title="data/mypack/palladium/suit_set_power/iron_spider_powers.json"
{
  "suit_set": "mypack:iron_spider",
  "power": "mypack:wall_crawling"
}
```

Power tag:

```json title="data/mypack/palladium/suit_set_power/iron_spider_powers.json"
{
  "suit_set": "mypack:iron_spider",
  "power": "#mypack:iron_spider_powers"
}
```

Multiple power IDs:

```json title="data/mypack/palladium/suit_set_power/iron_spider_powers.json"
{
  "suit_set": "mypack:iron_spider",
  "power": ["mypack:wall_crawling", "mypack:web_shooting"]
}
```
