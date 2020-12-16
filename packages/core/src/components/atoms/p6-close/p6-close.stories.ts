import { Components } from '../../../components';
import { ComponentProps, getElement, makeSizeStory, makeStory, Props } from '../../../shared/storybook';
import { Size } from '../../../shared/types';

const component = 'p6-close';

export default {
  title: 'Atoms/Close',
  component,
};

const componentProps: ComponentProps = ['size', 'disabled'];

const getStoryField = (props?: Props<Components.P6Close>): HTMLElement => getElement(component, [], props);

export const Default = makeStory<{
  size: Size;
  disabled: boolean;
}>({
  componentProps,
  args: {
    size: Size.normal,
    disabled: false,
  },
  builder: (args): HTMLElement => getStoryField(args),
});

export const Disabled = makeStory<{ disabled: boolean }>({
  componentProps,
  args: { disabled: true },
  builder: (props): HTMLElement => getStoryField(props),
});

export const Sizes = makeSizeStory({
  componentProps,
  builder: ({ value }) =>
    getStoryField({
      size: value,
    }),
});
