import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p6-tab',
  styleUrl: 'p6-tab.scss',
  shadow: true,
})
export class P6Tab implements ComponentInterface {
  @Element() host!: HTMLP6TabElement;

  /**
   * Set the tab active
   */
  @Prop({ reflect: true }) active = false;

  /**
   * Set the tab closeable
   */
  @Prop({ reflect: true }) closeable = false;

  /**
   * A tab-content id must be provided for each `p6-tab`. It's used internally to reference
   * the selected tab and to switch between them.
   */
  @Prop() for!: string;

  /**
   * Set the text to be display in a tooltip
   */
  @Prop() tooltip?: string;

  /**
   * Emitted when the tab has been closed
   */
  @Event() p6Close!: EventEmitter<{ id: string }>;

  /**
   * Emitted when the tab is clicked
   */
  @Event() p6Select!: EventEmitter<{ id: string }>;

  render(): JSX.Element {
    /*
    class={{
      'has-tooltip-arrow': true,
      [`has-tooltip-${Position[this.position]}`]: !isDefaultPosition(this.position, Position.top),
      [`has-tooltip-${Mode[this.mode]}`]: !isDefaultMode(this.mode),
    }}
    innerHTML={img.html[0]}
    data-tooltip={this.text}
*/
    return (
      <Host slot="tab" role="tab" onClick={this.onClickHandler} onKeyup={this.onKeyUpHandler}>
        <div class={{ 'has-tooltip-arrow': this.tooltip !== undefined }} data-tooltip={this.tooltip || null}>
          <div class="slotWrapper">
            <slot />
          </div>
        </div>

        {this.closeable ? <p6-close onClick={this.onCloseHandler} /> : null}
      </Host>
    );
  }

  private onKeyUpHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.triggerSelectTab(event);
    }
  };

  private onClickHandler = (event: Event): void => {
    this.triggerSelectTab(event);
  };

  private onCloseHandler = (event: Event): void => {
    this.triggerCloseTab(event);
  };

  private triggerSelectTab(event: Event | KeyboardEvent) {
    this.p6Select.emit({ id: this.for });
    event.preventDefault();
  }

  private triggerCloseTab(event: Event | KeyboardEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.p6Close.emit({ id: this.for });
  }
}
