import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { NgbsAuthLogInFormComponent } from './log-in-form.component';

export default {
  title: 'LogInComponent',
  component: NgbsAuthLogInFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAuthLogInFormComponent],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<NgbsAuthLogInFormComponent>;

const Template: Story<NgbsAuthLogInFormComponent> = (args: NgbsAuthLogInFormComponent) => ({
  template: `<ngbs-log-in-form (action)="action($event)"></ngbs-log-in-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
