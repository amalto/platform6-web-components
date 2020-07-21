# p6-grid-options

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute           | Description                        | Type                                | Default     |
| ---------------------- | ------------------- | ---------------------------------- | ----------------------------------- | ----------- |
| `columns` _(required)_ | --                  | List of grid columns               | `Column<Record<string, unknown>>[]` | `undefined` |
| `optionsDisplayed`     | `options-displayed` | Status of the grid options display | `boolean`                           | `true`      |
| `searchValue`          | `search-value`      | Value used to filter the data      | `string \| undefined`               | `undefined` |

## Events

| Event                      | Description                   | Type                                  |
| -------------------------- | ----------------------------- | ------------------------------------- |
| `p6FilterRows`             | Update the data filter        | `CustomEvent<FilterRowsDetail>`       |
| `p6ResetCustomDefinitions` | Reset the grid configuration  | `CustomEvent<ResetDefinitionsDetail>` |
| `p6ShowOptions`            | Show or hide the grid options | `CustomEvent<ShowOptionsDetail>`      |

## Dependencies

### Used by

- [p6-grid](../..)

### Depends on

- [p6-icon](../../../../atoms/p6-icon)
- [p6-action](../../../../atoms/p6-action)

### Graph

```mermaid
graph TD;
  p6-grid-actions --> p6-icon
  p6-grid-actions --> p6-action
  p6-grid --> p6-grid-actions
  style p6-grid-actions fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_