import { newSpecPage } from '@stencil/core/testing';
import { P6Panel } from '../p6-panel';

describe('p6-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Panel],
      html: `<p6-panel></p6-panel>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
