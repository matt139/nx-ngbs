import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SignUpFormComponent } from './sign-up-form.component';
import { SelectStylesheetDirective } from '@ngbs/utils';

export default {
  title: 'SignUpComponent',
  component: SignUpFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [SignUpFormComponent, SelectStylesheetDirective],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<SignUpFormComponent>;

const Template: Story<SignUpFormComponent> = (args: SignUpFormComponent) => ({
  template: `
  <select class="form-select" ngbsSelectStylesheet>
  </select>
  <ngbs-sign-up-form (action)="action($event)"></ngbs-sign-up-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
