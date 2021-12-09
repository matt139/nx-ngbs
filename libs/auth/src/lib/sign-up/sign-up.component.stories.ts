import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'SignUpComponent',
  component: SignUpComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    actions: {
      action: 'submit',
    },
  },
} as Meta<SignUpComponent>;

const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  component: SignUpComponent,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
