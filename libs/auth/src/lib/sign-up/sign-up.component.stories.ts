import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SignUpFormComponent } from './sign-up.component';

export default {
  title: 'SignUpComponent',
  component: SignUpFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [SignUpFormComponent],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<SignUpFormComponent>;

const Template: Story<SignUpFormComponent> = (args: SignUpFormComponent) => ({
  template: `<ngbs-sign-up (action)="action($event)"></ngbs-sign-up>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
