# Feature Flags

Feature flags are opt-in switches that enable specific content which is disabled by default. In an addonpack, they are declared in the `pack.mcmeta` file under a `features` block. Any flag not listed there stays inactive, and the content gated behind it will not be loaded.

```json title="pack.mcmeta"
{
  "addonpack": {
    "description": "My Pack",
    "min_format": [2, 0],
    "max_format": [2, 0]
  },
  "features": {
    "enabled": [
      "palladium:material/titanium",
      "palladium:worldgen/meteorite_biome"
    ]
  }
}
```

---

## Palladium Feature Flags

The following flags are provided by Palladium:

| Flag                                          | Description                                                        |
|-----------------------------------------------|--------------------------------------------------------------------|
| `palladium:mechanic/tailoring`                | Enables the Tailoring Bench.                                       |
| `palladium:mechanic/multiversal_variants`     | Enables the Multiversal Iterator and Multiversal Extrapolator.     |
| `palladium:customization/eye_selection`       | Enables the eye position menu.                                     |
| `palladium:material/circuits`                 | Enables circuit items.                                             |
| `palladium:material/lead`                     | Enables Lead items and world generation.                           |
| `palladium:material/titanium`                 | Enables Titanium items and world generation.                       |
| `palladium:material/vibranium`                | Enables Vibranium items and world generation.                      |
| `palladium:worldgen/meteorite_biome`          | Enables meteorite biome world generation.                          |
| `palladium:item/vials`                        | Enables the Vial, which can hold fluids.                           |
| `palladium:block/heart_shaped_herb`           | Enables the Heart-Shaped Herb flower and its potted version. Together with `palladium:worldgen/meteorite_biome`, herb meadows also grow in meteorite caves, and a few herbs grow on the surface above them. |

---

## Enabling All Palladium Flags

To opt into all of Palladium's optional content at once:

```json title="pack.mcmeta"
{
  "addonpack": {
    "description": "My Pack",
    "min_format": [2, 0],
    "max_format": [2, 0]
  },
  "features": {
    "enabled": [
      "palladium:mechanic/tailoring",
      "palladium:mechanic/multiversal_variants",
      "palladium:customization/eye_selection",
      "palladium:worldgen/meteorite_biome",
      "palladium:material/circuits",
      "palladium:material/lead",
      "palladium:material/titanium",
      "palladium:material/vibranium",
      "palladium:item/vials",
      "palladium:block/heart_shaped_herb"
    ]
  }
}
```
