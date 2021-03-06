import { library } from '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { newSpecPage } from '@stencil/core/testing';
import { L10n } from '../../../../utils/translations';
import l10n_en from '../locales/p6-empty.i18n.en.json';
import l10n_fr from '../locales/p6-empty.i18n.fr.json';
import { P6Empty } from '../p6-empty';

library.add(faFolderOpen);

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch;

function getDataFromUrl(url: string): L10n | null {
  if (url.startsWith('/locales/p6-empty.i18n.en.json')) {
    return l10n_en;
  }
  if (url.startsWith('/locales/p6-empty.i18n.fr.json')) {
    return l10n_fr;
  }
  return null;
}

beforeAll(() => {
  jest.spyOn(global, 'fetch').mockImplementation(url => {
    const l10n = getDataFromUrl(url as string);
    if (l10n === null) {
      return Promise.reject(new Error(`No locale file found for ${url}`));
    }
    return Promise.resolve(new Response(JSON.stringify(l10n)));
  });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('p6-empty', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty></p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('translation', () => {
    const locales = ['fr', 'en'];
    it.each(locales)(`Should translate %s`, async (locale: string) => {
      const page = await newSpecPage({
        components: [P6Empty],
        html: `<div lang="${locale}"><p6-empty></p6-empty></div>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  it('with message', async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty>No data!</p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('with image', async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty><p6-icon slot='image' name='home'/></p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('with image and message', async () => {
    const page = await newSpecPage({
      components: [P6Empty],
      html: `<p6-empty><p6-icon slot='image' name='home'/>No data!</p6-empty>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
