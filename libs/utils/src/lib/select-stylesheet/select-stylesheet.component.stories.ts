import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SelectStylesheetDirective } from '../select-stylesheet.directive';
import { SelectStylesheetComponent } from './select-stylesheet.component';

export default {
  title: 'SelectStylesheetComponent',
  component: SelectStylesheetComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [SelectStylesheetDirective],
    }),
  ],
} as Meta<SelectStylesheetComponent>;

const Template: Story<SelectStylesheetComponent> = (
  args: SelectStylesheetComponent
) => ({
  template: `<select ngbsSelectStylesheet class="form-select"></select>`,
  component: SelectStylesheetComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
