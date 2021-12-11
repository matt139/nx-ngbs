import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NgbsSignUpFormComponent } from './sign-up-form.component';
import { SelectStylesheetDirective } from '@ngbs/utils';

export default {
  title: 'SignUpComponent',
  component: NgbsSignUpFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsSignUpFormComponent, SelectStylesheetDirective],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<NgbsSignUpFormComponent>;

const Template: Story<NgbsSignUpFormComponent> = (args: NgbsSignUpFormComponent) => ({
  template: `
  <select class="form-select" ngbsSelectStylesheet>
  </select>
  <ngbs-sign-up-form (action)="action($event)"></ngbs-sign-up-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
