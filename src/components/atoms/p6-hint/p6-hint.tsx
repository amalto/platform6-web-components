import { Component, ComponentInterface, h, Host, Prop } from "@stencil/core";
import { Mode } from "~shared/types";
import { isEmpty } from "~utils/attribute";

@Component({
  tag: "p6-hint",
  styleUrl: "p6-hint.scss",
  shadow: true,
})
export class P6Hint implements ComponentInterface {
  /**
   * set the mode of the hint
   */
  @Prop() mode: Mode = "default";

  render(): JSX.Element {
    return (
      <Host
        class={{
          [`is-${this.mode}`]: !isEmpty(this.mode) && this.mode !== "default",
        }}
      >
        <slot />
      </Host>
    );
  }
}