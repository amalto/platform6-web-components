import { Component, Element, h, Host, Prop } from "@stencil/core";
import { getTabId, getValidTabs } from "./utils";

export interface Tab {
  id: string;
  title: string;
}

@Component({
  tag: "p6-tabs",
  styleUrl: "p6-tabs.scss",
  shadow: true,
})
export class P6Tabs {
  @Element() host!: HTMLP6TabsElement;

  /**
   * Default tab selected.
   */
  // eslint-disable-next-line @stencil/strict-mutable
  @Prop({ mutable: true }) selected: string | undefined;

  private handleTabSelection = (event: MouseEvent): void => {
    event.preventDefault();
    const { id } = event.currentTarget as HTMLAnchorElement;
    this.selected = id;
  };

  private getTabs(): Tab[] {
    return getValidTabs(Array.from(this.host.children)).map((c) => ({
      title: c.getAttribute("title") as string,
      id: c.getAttribute("id") as string,
    }));
  }

  private getContent(): JSX.Element {
    const child = getValidTabs(Array.from(this.host.children)).filter(
      (c) => getTabId(c.getAttribute("id") as string) === this.selected
    )[0];

    return <div class="tab-content">{child?.innerHTML}</div>;
  }

  componentWillLoad(): void {
    this.selected = getTabId(this.selected || this.getTabs()[0]?.id);
  }

  render(): JSX.Element | null {
    const { selected } = this;
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div class="tabs">
          <ul>
            {tabs.map((tab) => (
              <li>
                <a
                  class={
                    selected === getTabId(tab.id) ? "is-active" : undefined
                  }
                  href={`#${tab.id}`}
                  id={`${getTabId(tab.id)}`}
                  onClick={this.handleTabSelection}
                >
                  {tab.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {this.getContent()}
      </Host>
    );
  }
}
