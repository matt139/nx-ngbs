import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NgbsAuthSignUpFormComponent } from './sign-up-form.component';
import { SelectStylesheetDirective } from '@ngbs/utils';

export default {
  title: 'Sign Up Form',
  component: NgbsAuthSignUpFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAuthSignUpFormComponent, SelectStylesheetDirective],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<NgbsAuthSignUpFormComponent>;

const Template: Story<NgbsAuthSignUpFormComponent> = (args: NgbsAuthSignUpFormComponent) => ({
  template: `
  <ngbs-auth-sign-up-form (action)="action($event)"></ngbs-auth-sign-up-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
