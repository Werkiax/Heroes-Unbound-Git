# Data Attachments

Data attachments are named pieces of data that can be stored on any entity. They are primarily used as custom variables that powers and abilities can read from and write to, for instance, tracking a cooldown timer, storing a player's skin state, or holding a custom counter.

Data attachment files go in:

```
addon/<namespace>/data_attachment/<id>.json
```

---

## Fields

| Field           | Type    | Default | Description                                                         |
|-----------------|---------|---------|---------------------------------------------------------------------|
| `type`          | String  | —       | The data type stored in this attachment. See [Types](#types) below. |
| `sync_with`     | String  | —       | Who the value is synced to. One of `none`, `self`, `all`.           |
| `copy_on_death` | Boolean | `true`  | When `true`, the value is preserved when the player respawns.       |

### `sync_with`

| Value  | Description                                                                    |
|--------|--------------------------------------------------------------------------------|
| `none` | The value is never synced to any client. Use this for purely server-side data. |
| `self` | The value is synced only to the player who owns it.                            |
| `all`  | The value is synced to all players within tracking range.                      |

---

## Types

| Type                       | Default value | Description                         |
|----------------------------|---------------|-------------------------------------|
| `palladium:byte`           | `0`           | An 8-bit integer (-128 to 127).     |
| `palladium:short`          | `0`           | A 16-bit integer (-32768 to 32767). |
| `palladium:integer`        | `0`           | A 32-bit integer.                   |
| `palladium:long`           | `0`           | A 64-bit integer.                   |
| `palladium:float`          | `0.0`         | A 32-bit floating point number.     |
| `palladium:double`         | `0.0`         | A 64-bit floating point number.     |
| `palladium:boolean`        | `false`       | A true/false value.                 |
| `palladium:string`         | `""`          | A text string.                      |
| `palladium:text_component` | empty         | A Minecraft text component.         |

Each type also has a corresponding **array variant** (e.g. `palladium:integer_array`) that stores a list of values of that type. The default value for array types is an empty list.

---

## Examples

```json title="addon/mypack/data_attachment/cooldown_timer.json"
{
  "type": "palladium:integer",
  "sync_with": "self",
  "copy_on_death": false
}
```

```json title="addon/mypack/data_attachment/display_name.json"
{
  "type": "palladium:string",
  "sync_with": "all",
  "copy_on_death": true
}
```

---

## Command

The value of a data attachment on an entity can be read or overwritten using the `/palladium data-attachment` command. Requires operator-level permissions (game master).

**Get** the current value on an entity:

```
/palladium data-attachment get entity <entity> <type>
```

**Set** a new value on one or more entities:

```
/palladium data-attachment set entity <entities> <type> <value>
```

The `<type>` argument is the registry ID of the attachment (e.g. `mypack:cooldown_timer`). The `<value>` is provided as an NBT tag matching the attachment's type, for example `42` for an integer, or `"hello"` for a string.
