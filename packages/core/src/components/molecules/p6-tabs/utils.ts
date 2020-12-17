export function getTabId(id: string): string {
  return `${id}-tab`;
}

export function isTab(tab: Element): tab is HTMLP6TabElement {
  return tab.nodeName === 'P6-TAB';
}

export function isTabContent(tab: Element): tab is HTMLP6TabElement {
  return tab.nodeName === 'P6-TAB-CONTENT';
}
