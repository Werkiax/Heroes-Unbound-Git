# Multiversal Iterator

Palladium's Multiversal Iterator allows you to simply convert item/suits into variants of other universes. Addon Packs can easily define variants and universes.


## Adding universes

:::info

To avoid multiple occurences of the same universes across addon packs, I advise for everyone to use the `c` (for "common") namespace for declaring them.  
That means adding universes like this:  

| Universe     | Path                                          | ID             |
|--------------|-----------------------------------------------|----------------|
| Earth-616    | data/c/palladium/multiverse/earth-616.json    | c:earth-616    |
| Earth-1      | data/c/palladium/multiverse/earth-1.json      | c:earth-1      |
| Earth-199999 | data/c/palladium/multiverse/earth-199999.json | c:earth-199999 |

:::

Adding a new universe is as simple as:

```json title="data/<namespace>/palladium/multiverse/<filename>.json"
{
  
}
```

Yes, leaving it all empty is already enough for it to work.

There are extra settings though:

```json title="data/<namespace>/palladium/multiverse/<filename>.json"
{
  "weight": 100
}
```

When you right-click a Multiversal Extrapolator you change the "chance" by which the universe is chosen by changing the `weight`.
By default, the weight is 50. Higher weight means more likely to be chosen, and vice versa.

Weights can also be conditional:
```json title="data/<namespace>/palladium/multiverse/<filename>.json"
{
  "weight": 50,
  "conditional_weights": [
    {
      "weight": 200,
      "if": {
        "type": "palladium:crouching"
      }
    }
  ]
}
```
In this example, the weight is usually at 50. But if the player is crouching, the weight shoots up to 200, making it much more likely to be chosen.


## Adding variants

After you've added universes you can declare variants of them. For that you simply create a file like this:
```json title="data/<namespace>/palladium/multiversal_item_variants/<filename_1>.json"
{
  "universe": "c:earth-616",
  "variants": {
    "test:example_helmets": [
      "test:basic_helmet"
    ]
  }
}
```
```json title="data/<namespace>/palladium/multiversal_item_variants/<filename_2>.json"
{
  "universe": "c:earth-199999",
  "variants": {
    "test:example_helmets": [
      "test:standard_helmet"
    ]
  }
}
```

These two files define the `basic_helmet` and `standard_helmet` as two variants of each other, of Earth-616 and Earth-199999 respectively.  
`test:example_helmets` functions as a "multiversal identifier" across all universes, by which they can find each other.


## Enabling Portal Structures

By default, there is no way to obtain Multiversal Extrapolators in survival. You can add crafting recipes yourself if you choose to.  
Alternatively, Palladium offers a structure that can spawn in the world which include these items. They are disabled by
default to not have them spawn for packs that don't even need them.  
To enable them, you need to enable their feature flag in your `pack.mcmeta` file like this:

```json title="pack.mcmeta"
{
  "pack": {
    "id": "your_pack_id",
    "description": "Your pack description",
    "pack_format": 8,
    "version": "1.0.0"
  },
  // highlight-start
  "feature_flags": [
    "worldgen/ruined_multiverse_portals"
  ],
  // highlight-end
}
```
