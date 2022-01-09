import { ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { NgbsAuthUpdateEmailFormComponent } from './update-email-form.component'

export default {
  title: 'NgbsAuthUpdateEmailFormComponent',
  component: NgbsAuthUpdateEmailFormComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAuthUpdateEmailFormComponent],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
  },
} as Meta<NgbsAuthUpdateEmailFormComponent>

const Template: Story<NgbsAuthUpdateEmailFormComponent> = (
  args: NgbsAuthUpdateEmailFormComponent
) => ({
  template: `<ngbs-auth-update-email-form (action)="action($event)"></ngbs-auth-update-email-form>`,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
