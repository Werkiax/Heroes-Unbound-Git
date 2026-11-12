# Trails

Trails are a neat visual addition to various powers.  
You can find info for all the trails types in the `trails.html` file in your `mods/documentation/palladium` folder.

A simple lightning trail could look like this:

```json title="assets/<namespace>/palladium/trails/<filename>.json"
{
  "type": "palladium:lightning",
  "spacing": 1,
  "lifetime": 20,
  "glow_color": "#ff0000",
  "amount": 7,
  "thickness": 0.05
}
```

Then you can reference the trail in a `palladium:trail` ability in your power like this:

```json
"example_trail": {
  "type": "palladium:trail",
  "trail": "namespace:filename"
}
```

# Examples

You can find examples for some trails in the test pack [here](https://github.com/ThreeTAG/Palladium/tree/1.20/main/run/addonpacks/Test%20Pack/assets/test/palladium/trails).

They are used in [this power](https://github.com/ThreeTAG/Palladium/blob/1.20/main/run/addonpacks/Test%20Pack/data/test/palladium/powers/trail_test.json).