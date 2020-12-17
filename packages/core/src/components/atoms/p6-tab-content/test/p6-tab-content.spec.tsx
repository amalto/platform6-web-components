import { newSpecPage } from '@stencil/core/testing';
import { P6TabContent } from '../p6-tab-content';

describe('p6-tab-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6TabContent],
      html: `<p6-tab-content></p6-tab-content>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
