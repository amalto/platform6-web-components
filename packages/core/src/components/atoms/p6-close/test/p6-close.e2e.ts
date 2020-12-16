import { newE2EPage } from '@stencil/core/testing';

describe('p6-close', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<p6-close></p6-close>');

    const element = await page.find('p6-close');
    expect(element).not.toBeNull();
    expect(element).toHaveClass('hydrated');
  });
});
