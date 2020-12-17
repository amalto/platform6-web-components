import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, JSX, Listen, Method, State } from '@stencil/core';
import { toArray } from '../../../utils/dom';
import { isTab, isTabContent } from './utils';

@Component({
  tag: 'p6-tabs',
  styleUrl: 'p6-tabs.scss',
  shadow: true,
})
export class P6Tabs implements ComponentInterface {
  @Element() host!: HTMLP6TabsElement;

  /**
   * Emitted when a tab is closing
   */
  @Event() p6TabClose!: EventEmitter<{ id: string; nextActiveId: string | undefined }>;

  /**
   * Emitted when a tab is clicked
   */
  @Event() p6TabSelect!: EventEmitter<{ id: string }>;

  @State() activeTab: string | undefined;

  @Listen('p6Select')
  onSelectTab(event: CustomEvent<{ id: string }>): void {
    event.preventDefault();
    this.activeTab = event.detail.id;
    this.p6TabSelect.emit({ id: this.activeTab });
  }

  @Listen('p6Close')
  onCloseTab(event: CustomEvent<{ id: string }>): void {
    this.closeTab(event.detail.id);
    event.preventDefault();
  }

  /**
   * refresh the component
   */
  @Method()
  async refresh(): Promise<void> {
    this.activeTab = this.getSelectedTabId();
  }

  /**
   * close a tab
   * @param tabId the id of the tab to be close
   */
  @Method()
  async close(tabId: string): Promise<boolean> {
    return this.closeTab(tabId);
  }

  componentWillLoad(): void {
    this.activeTab = this.getSelectedTabId();
  }

  componentWillRender(): void {
    if (this.activeTab === undefined) {
      return;
    }

    toArray(this.host.children).forEach(child => {
      if (isTab(child)) {
        // eslint-disable-next-line no-param-reassign
        child.active = child.for === this.activeTab;
      } else if (isTabContent(child)) {
        // eslint-disable-next-line no-param-reassign
        child.active = child.id === this.activeTab;
      }
    });
  }

  render(): JSX.Element | null {
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Host>
        <div class="tabs">
          <slot name="tab" />
        </div>
        <div class="tab-contents">
          <slot />
        </div>
      </Host>
    );
  }

  private getTabs(): HTMLP6TabElement[] {
    return toArray(this.host.children).filter(isTab);
  }

  private getSelectedTabId(): string | undefined {
    const tabs = this.getTabs();

    if (tabs.length === 0) {
      return undefined;
    }

    const selectedTab = this.getTabs().find(tab => tab.active === true);

    return selectedTab?.for ?? tabs[0].for;
  }

  private getNextId(currentId: string): string | undefined {
    const tabs = this.getTabs();

    const tabToCloseIndex = tabs.findIndex(tab => tab.for === currentId);

    return tabs[tabToCloseIndex - 1]?.for ?? tabs[0]?.for;
  }

  private closeTab(id: string): Promise<boolean> {
    const tabs = this.getTabs();
    const tabToClose = tabs.find(tab => tab.for === id);

    if (tabToClose === undefined) {
      return Promise.resolve(true);
    }

    const activeTabUnknown = tabs.find(tab => tab.for === this.activeTab) === undefined;
    const nextSelectedId: string | undefined = tabToClose.for === this.activeTab || activeTabUnknown ? this.getNextId(tabToClose.for) : this.activeTab;

    this.p6TabClose?.emit({ id: tabToClose.for, nextActiveId: nextSelectedId });

    return Promise.resolve(true);
  }
}
