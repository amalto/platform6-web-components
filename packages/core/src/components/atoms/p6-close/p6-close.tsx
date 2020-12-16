import { Component, ComponentInterface, h, Host, JSX, Prop } from '@stencil/core';
import { Size } from '../../../shared/types';
import { getSizeClass } from '../../../utils/classes';

@Component({
  tag: 'p6-close',
  styleUrl: 'p6-close.scss',
  shadow: true,
})
export class P6Close implements ComponentInterface {
  /**
   * set the size of the action
   */
  @Prop() size: Size = Size.normal;

  render(): JSX.Element | null {
    const classes = {
      ...getSizeClass(this.size),
    };

    return (
      <Host aria-label="close">
        <button type="button" class={classes} />
      </Host>
    );
  }
}
