import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p6-tab-content',
  styleUrl: 'p6-tab-content.scss',
  shadow: true,
})
export class P6TabContent implements ComponentInterface {
  /**
   * Set the tab content active
   */
  @Prop() active = false;

  render(): JSX.Element {
    return (
      <Host aria-hidden={!this.active ? 'true' : null} class={{ hidden: !this.active }}>
        <slot />
      </Host>
    );
  }
}
