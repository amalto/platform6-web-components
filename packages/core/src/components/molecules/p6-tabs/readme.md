# p6-tabs

<!-- Auto Generated Below -->

## Events

| Event         | Description                   | Type                                                              |
| ------------- | ----------------------------- | ----------------------------------------------------------------- |
| `p6TabClose`  | Emitted when a tab is closing | `CustomEvent<{ id: string; nextActiveId: string \| undefined; }>` |
| `p6TabSelect` | Emitted when a tab is clicked | `CustomEvent<{ id: string; }>`                                    |

## Methods

### `close(tabId: string) => Promise<boolean>`

close a tab

#### Returns

Type: `Promise<boolean>`

### `refresh() => Promise<void>`

refresh the component

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
