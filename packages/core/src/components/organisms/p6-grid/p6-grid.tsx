import { Component, Element, Event, EventEmitter, h, Host, JSX, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { SortOrder } from '../../../shared/types';
import { partitionWith } from '../../../utils/array';
import { getL10n, L10n } from '../../../utils/translations';
import { P6GridHeaderColumns } from './components/p6-grid-header-columns';
import { fromDefinition, isHidden, move, replaceColumn } from './core/column';
import {
  AlignColumnDetail,
  CellValueChangedDetail,
  Column,
  ColumnDefinition,
  ColumnId,
  DataItem,
  EditingCellDetail,
  EditingCellStatus,
  FilterRowsDetail,
  MoveColumnDetail,
  ResetDefinitionsDetail,
  ResizeColumnDetail,
  Row,
  RowId,
  ShowColumnDetail,
  ShowOptionsDetail,
  SortColumnDetail,
} from './core/entities';
import { compareRow, filterBy, fromData, rangeSelectRow, replaceRow } from './core/row';

function createCellId(rowId: RowId, colId: ColumnId): string {
  return `row-${rowId}:col-${colId}`;
}

@Component({
  tag: 'p6-grid',
  styleUrl: 'p6-grid.scss',
  assetsDirs: ['locales'],
  shadow: true,
})
export class P6Grid {
  @Element() host!: HTMLP6GridElement;

  /**
   * Display a context menu based on row data
   */
  @Prop() customContextMenu?: (row: Row<DataItem>) => JSX.Element;

  /**
   * Display spinner
   */
  @Prop() loading = false;

  /**
   * Grid headers
   */
  @Prop() definitions!: ColumnDefinition<DataItem>[];

  /**
   * Default grid headers
   */
  @Prop() defaultDefinitions?: ColumnDefinition<DataItem>[];

  /**
   * Grid rows
   */
  @Prop() data!: DataItem[];

  /**
   * Fires when the configuration changes
   */
  @Event() p6GridConfigurationChange!: EventEmitter<{
    columns: Column<DataItem>[];
  }>;

  /**
   * Fires when the row data changes
   */
  @Event() p6GridRowDataChange!: EventEmitter<{ row: DataItem; previous: DataItem | undefined; cloning: boolean }>;

  /**
   * Fire when editing a row starts or stops
   */
  @Event() p6GridEditingRow!: EventEmitter<{ rowId: RowId; colId?: ColumnId; editing: boolean }>;

  /**
   * Fire when a row is selected
   */
  @Event() p6GridSelectedRowsChange!: EventEmitter<{ rowIds: Set<RowId> }>;

  @State() columns: Column<DataItem>[] = [];

  @State() rows: Row<DataItem>[] = [];

  @State() selectedRows: Set<RowId> = new Set();

  @State() rowContext: Row<DataItem> | undefined;

  @State() displayTags = true;

  @State() isContextMenuOpen = false;

  @State() searchValue = '';

  @State() sortedBy: Column<DataItem> | undefined;

  @State() editingCells: Set<string> = new Set();

  @Listen('p6AlignColumn')
  onP6AlignColumn(event: CustomEvent<AlignColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6MoveColumn')
  onP6MoveColumn(event: CustomEvent<MoveColumnDetail<DataItem>>): void {
    this.columns = move(event.detail.column.id, event.detail.direction, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ResizeColumn')
  onP6ResizeColumn(event: CustomEvent<ResizeColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6SortColumn')
  onP6SortColumn(event: CustomEvent<SortColumnDetail<DataItem>>): void {
    this.sortedBy = event.detail.column;
    this.columns = this.columns.map(col => (col.id === event.detail.column.id ? event.detail.column : { ...col, sortOrder: SortOrder.none }));
    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ShowColumn')
  onP6ShowColumn(event: CustomEvent<ShowColumnDetail<DataItem>>): void {
    this.columns = replaceColumn(event.detail.column, this.columns);

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6GridCellValueChanged')
  onP6GridCellValueChanged(event: CustomEvent<CellValueChangedDetail<DataItem>>): void {
    const current = event.detail.row;
    const cloning = current.id.endsWith('-clone');
    const previousId = cloning ? current.id.slice(0, -6) : current.id;
    const previous = this.rows.find(row => row.id === previousId);

    this.rows = replaceRow(current, this.rows);

    this.p6GridRowDataChange.emit({
      row: event.detail.row.data,
      previous: previous?.data,
      cloning,
    });
  }

  @Listen('p6GridEditingCell')
  onP6GridEditingCell(event: CustomEvent<EditingCellDetail<DataItem>>): void {
    const cellId = createCellId(event.detail.row.id, event.detail.column.id);
    const rowPartId = `row-${event.detail.row.id}`;

    if (EditingCellStatus.Start === event.detail.status) {
      this.editingCells.add(cellId);
    } else {
      this.editingCells.delete(cellId);
    }

    const numberOfEditedRowCell = Array.from(this.editingCells).filter(cid => cid.startsWith(rowPartId)).length;

    if (numberOfEditedRowCell === 1) {
      this.p6GridEditingRow.emit({
        rowId: event.detail.row.id,
        colId: event.detail.column.id,
        editing: true,
      });
    }

    if (numberOfEditedRowCell === 0) {
      this.p6GridEditingRow.emit({ rowId: event.detail.row.id, editing: false });
    }
  }

  @Listen('p6ResetCustomDefinitions')
  onP6ResetCustomDefinitions(event: CustomEvent<ResetDefinitionsDetail>): void {
    if (event.detail.reset) {
      this.columns = this.defaultDefinitions === undefined ? this.definitions.map(fromDefinition) : this.defaultDefinitions.map(fromDefinition);
    }

    this.p6GridConfigurationChange.emit({ columns: this.columns });
  }

  @Listen('p6ShowOptions')
  onP6ShowOptions(event: CustomEvent<ShowOptionsDetail>): void {
    this.displayTags = event.detail.visible;
  }

  @Listen('p6FilterRows')
  onP6FilterRows(event: CustomEvent<FilterRowsDetail>): void {
    this.searchValue = event.detail.value;
  }

  @Watch('data')
  rowsUpdateHandler(newData: DataItem[]): void {
    this.rows = newData.map(fromData);
    this.selectedRows = new Set();
    this.editingCells = new Set();

    this.p6GridSelectedRowsChange.emit({ rowIds: this.selectedRows });
  }

  @Watch('definitions')
  columnsUpdateHandler(newDefinitions: ColumnDefinition<DataItem>[]): void {
    this.columns = newDefinitions.map(fromDefinition);
  }

  /**
   * Get the columns of the grid
   */
  @Method()
  async getColumns(): Promise<Column<DataItem>[]> {
    return Promise.resolve(this.columns);
  }

  /**
   * Get the row of the grid
   */
  @Method()
  async getRows(): Promise<Row<DataItem>[]> {
    return Promise.resolve(this.rows);
  }

  /**
   * Start editing a cell
   * @param rowId id of the row edited
   * @param columnId id of the row edited
   */
  @Method()
  async startEditingCell(rowId: RowId, columnId: ColumnId): Promise<void> {
    this.editingCells.add(createCellId(rowId, columnId));
  }

  /**
   * Stop editing a cell
   * @param rowId id of the row edited
   * @param columnId id of the row edited
   */
  @Method()
  async stopEditingCell(rowId: RowId, columnId: ColumnId): Promise<void> {
    this.editingCells.delete(createCellId(rowId, columnId));
  }

  /**
   * clone a row
   * @param rowId id of the row to be clone
   */
  @Method()
  async cloneRow(rowId: RowId): Promise<RowId> {
    const sourceIndex = this.rows.findIndex(row => row.id === rowId);
    if (sourceIndex > -1) {
      const cloneRowId = `${rowId}-clone`;
      const clone = { id: `${rowId}-clone`, data: { ...this.rows[sourceIndex] }.data };
      this.rows.splice(sourceIndex + 1, 0, clone);
      return Promise.resolve(cloneRowId);
    }
    return Promise.reject(new Error(`data not found for ${rowId}`));
  }

  /**
   * Select a list of rows
   * @param rowIds ids of the rows to be select
   */
  @Method()
  async selectRows(rowIds: RowId[] | 'all'): Promise<boolean> {
    const selectedIDs = rowIds === 'all' ? this.displayedRows.map(row => row.id) : rowIds;

    this.selectedRows = new Set(selectedIDs);

    this.p6GridSelectedRowsChange.emit({ rowIds: this.selectedRows });

    return true;
  }

  private l10n: L10n | undefined;

  private displayedRows: Row<DataItem>[] = [];

  private innerContextMenu: HTMLDivElement | null = null;

  async componentWillLoad(): Promise<void> {
    this.columns = this.definitions.map(fromDefinition);
    this.rows = this.data.map(fromData);

    [this.sortedBy] = this.columns;

    this.l10n = await getL10n(this.host);
  }

  componentWillRender(): void {
    this.displayedRows = Array.from(this.rows).filter(filterBy(this.searchValue, this.columns)).sort(compareRow(this.sortedBy));
  }

  render(): JSX.Element {
    const { loading } = this;
    const columns = partitionWith(isHidden)(this.columns);
    const displayGridOptions = columns[0].length > 0 && this.displayTags;
    const hasHeadersToDisplay = columns[1].length > 0;
    const emptyRows = this.displayedRows.length === 0;
    const hasRowsToDysplay = !this.loading && !emptyRows && hasHeadersToDisplay;

    return (
      <Host>
        {this.renderContextMenu()}

        <p6-grid-actions columns={this.columns} hideOptions={!displayGridOptions}>
          <slot name="actions" />
        </p6-grid-actions>

        {displayGridOptions ? <p6-grid-options title={this.l10n?.hideColumn} columns={this.columns} /> : undefined}
        {hasHeadersToDisplay ? <P6GridHeaderColumns columnsToDisplay={columns[1]} /> : undefined}

        {hasRowsToDysplay ? this.renderRows(this.displayedRows, columns[1]) : undefined}
        {loading ? this.renderLoading() : undefined}
        {!loading && emptyRows ? this.renderEmpty(emptyRows || !hasHeadersToDisplay) : undefined}
        <slot />
      </Host>
    );
  }

  private renderEmpty(renderEmpty: boolean): JSX.Element | undefined {
    return renderEmpty ? <p6-empty>{this.l10n?.emptyGrid}</p6-empty> : undefined;
  }

  private renderLoading(): void {
    return this.loading ? (
      <p6-spinner
        style={{
          height: '42px',
          width: '42px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    ) : undefined;
  }

  private renderRows = (rowsToDisplay: Row<DataItem>[], columnsToDisplay: Column<DataItem>[]): HTMLP6GridBodyElement | null => {
    return (
      <p6-grid-body>
        {rowsToDisplay.map(row => (
          <p6-grid-row
            key={`${this.host.id}-row-${row.id}`}
            onClick={this.selectRowHandler(row)}
            selected={this.selectedRows.has(row.id)}
            onContextMenu={this.rowContextMenuHandler(row)}
          >
            {columnsToDisplay.map(column => {
              const cellId = createCellId(row.id, column.id);
              return (
                <p6-grid-cell
                  key={cellId}
                  row={row}
                  column={column}
                  align={column.align}
                  color={column.color}
                  width={column.width}
                  editable={column.editable}
                  editing={this.editingCells.has(cellId)}
                />
              );
            })}
          </p6-grid-row>
        ))}
      </p6-grid-body>
    );
  };

  private selectRowHandler(row: Row<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      if (event.ctrlKey) {
        this.selectedRows = new Set(this.selectedRows.add(row.id));
      } else if (event.shiftKey) {
        this.selectedRows = rangeSelectRow(row.id, this.selectedRows, this.displayedRows);
      } else {
        this.selectedRows = new Set([row.id]);
      }

      this.p6GridSelectedRowsChange.emit({ rowIds: this.selectedRows });
    };
  }

  private renderContextMenu(): JSX.Element {
    const contextMenu: JSX.Element | undefined = this.rowContext && this.customContextMenu && this.customContextMenu(this.rowContext);

    return (
      <div
        class={`row-context-menu ${this.isContextMenuOpen ? 'is-open' : undefined}`}
        ref={dom => {
          if (dom) {
            this.innerContextMenu = dom;
          }
        }}
      >
        {contextMenu}
      </div>
    );
  }

  private rowContextMenuHandler(row: Row<DataItem>): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      event.preventDefault();
      this.rowContext = row;
      this.moveContextMenu(event.clientX, event.clientY);
    };
  }

  private moveContextMenu = (posX: number, posY: number): void => {
    if (this.innerContextMenu === null) {
      return;
    }

    if (!this.isContextMenuOpen) {
      this.innerContextMenu.addEventListener('click', this.onCloseContextMenu, {
        once: true,
      });
      this.isContextMenuOpen = true;
    }

    this.innerContextMenu.style.left = `${posX}px`;
    this.innerContextMenu.style.top = `${posY}px`;
  };

  private onCloseContextMenu = (): void => {
    if (this.innerContextMenu === null) {
      return;
    }
    this.innerContextMenu.removeEventListener('click', this.onCloseContextMenu);
    this.isContextMenuOpen = false;
  };
}
