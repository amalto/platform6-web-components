import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { newSpecPage } from '@stencil/core/testing';
import { P6Close } from '../p6-close';

library.add(faQuestionCircle);

describe('p6-close', () => {
  it('default output', async () => {
    const page = await newSpecPage({
      components: [P6Close],
      html: `<p6-close text="Tooltip"></p6-close>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
