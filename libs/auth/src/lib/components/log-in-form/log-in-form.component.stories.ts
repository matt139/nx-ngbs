import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LogInFormComponent } from './log-in-form.component';

export default {
  title: 'LogInComponent',
  component: LogInFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [LogInFormComponent],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<LogInFormComponent>;

const Template: Story<LogInFormComponent> = (args: LogInFormComponent) => ({
  template: `<ngbs-log-in-form (action)="action($event)"></ngbs-log-in-form>`,
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
