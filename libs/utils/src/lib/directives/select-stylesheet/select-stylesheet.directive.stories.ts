import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectStylesheetDirective } from './select-stylesheet.directive';

export default {
  title: 'SelectStylesheetComponent',
  component: SelectStylesheetDirective,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [SelectStylesheetDirective],
    }),
  ],
} as Meta<SelectStylesheetDirective>;

const Template: Story<SelectStylesheetDirective> = (
  args: SelectStylesheetDirective
) => ({
  template: `<select ngbsSelectStylesheet class="form-select"></select>`,
  component: SelectStylesheetDirective,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
