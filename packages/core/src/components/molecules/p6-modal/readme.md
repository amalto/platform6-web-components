# p6-modal

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute  | Description                                    | Type      | Default |
| --------- | ---------- | ---------------------------------------------- | --------- | ------- |
| `hasCard` | `has-card` | Display a modal with a head, a body and a foot | `boolean` | `false` |
| `open`    | `open`     | Open the modal                                 | `boolean` | `false` |

## Events

| Event     | Description                                  | Type                |
| --------- | -------------------------------------------- | ------------------- |
| `p6Close` | Emitted when the user try to close the modal | `CustomEvent<void>` |

## Dependencies

### Depends on

- [p6-close](../../atoms/p6-close)

### Graph

```mermaid
graph TD;
  p6-modal --> p6-close
  style p6-modal fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
