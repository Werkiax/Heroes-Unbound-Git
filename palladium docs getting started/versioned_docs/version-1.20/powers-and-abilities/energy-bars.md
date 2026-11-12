---
sidebar_position: 3
---

# Energy Bars
Energy Bars can be easily added to powers to indicate a power level, energy, or whatever.

## Setup
To add one, just add this to your power json:

```json
"energy_bars": {
   "energy_bar_name": {
       "max": 500,
       "auto_increase_per_tick": 1,
       "auto_increase_interval": 20,
       "color": "#fc8803"
   }
}
```

`energy_bar_name` must be a unique name of your bar so you can reference it later.  
`max` is the maximum value of what your energy bar can hold. You can dynamically change this with a command if you desire.  
`auto_increase_per_tick` *(optional)* can be used if your energy bar is passively charging up.  
`auto_increase_interval` *(optional)* can be used to determine when `auto_increase_per_tick` is getting depleted (in ticks).  
`color` *(optional)* is the color of your bar, duh.

With this set up the bar will appear, in the next section you can see how you can use.


## Ability Usage
The most common usage for energy bars will be depleting them when using an ability. You can simply add this to an ability to do so:
```json
"energy_bar_usage": {
   "energy_bar": "energy_bar_name",
   "amount": 10
}
```

There is also a condition which you can add to make sure the energy bar has enough energy:
```json
"conditions": {
   "unlocking": {
      "type": "palladium:energy_bar",
      "energy_bar": "energy_bar_name",
      "min": 500
   }
}
```


## Syncing with Scoreboards
In some cases it might be useful to sync the value of the energy bar to reflect the current score of a player. You can easily do that in the energy bar itself:
```json
"energy_bars": {
  "test": {
    "color": "#ffffff",
    "synced_value": {
      "type": "score",
      "objective": "objective_name",
      "fallback": 0
    }
  }
}
```
`fallback` would be the value that is used if the objective/score can't be found.  
You can also do the same for the max_value:
```json
"energy_bars": {
  "test": {
    "color": "#ffffff",
    "max_value": {
      "type": "score",
      "objective": "objective_name",
      "fallback": 0
    }
  }
}
```
Both are combineable of course.


You can do the same with Palladium Properties aswell, if you have set them up using KubeJS:
```json
"energy_bars": {
  "test": {
    "color": "#ffffff",
    "synced_value": {
      "type": "palladium_property",
      "property": "your_property_name",
      "fallback": 0
    }
  }
}
```