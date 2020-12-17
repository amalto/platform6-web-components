import { newE2EPage } from '@stencil/core/testing';

describe('p6-tab-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-tab-content></p6-tab-content>');

    const element = await page.find('p6-tab-content');
    expect(element).toHaveClass('hydrated');
  });
});
