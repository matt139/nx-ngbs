import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NgbsAuthSignUpFormComponent } from './sign-up-form.component';
import { SelectStylesheetDirective } from '@ngbs/utils';

export default {
  title: 'SignUpComponent',
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
  <select class="form-select" ngbsSelectStylesheet>
  </select>
  <ngbs-sign-up-form (action)="action($event)"></ngbs-sign-up-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
