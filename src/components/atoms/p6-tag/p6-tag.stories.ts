import {
  getComponent,
  makeStory,
  ModeStoryMaker,
  Prop,
  SizeStoryMaker,
} from "../../../shared/storybook/stories";
import { Mode, Size } from "../../../shared/types";

const getStoryField = (name: string, props?: Prop): string =>
  getComponent("p6-tag", name, { name, ...props });

export const DefaultStory = makeStory<{
  size: Size;
  mode: Mode;
  label: string;
}>({
  args: {
    size: Size.normal,
    mode: Mode.default,
    label: "Tag",
  },
  builder: ({ label, ...args }): string => getStoryField(label, { ...args }),
});

export const SizeStory = makeStory({
  builder: (): string =>
    SizeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        size: value,
      })
    ),
});

export const ModeStory = makeStory({
  builder: (): string =>
    ModeStoryMaker(({ key, value }) =>
      getStoryField(key, {
        mode: value,
      })
    ),
});
