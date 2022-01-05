import { ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { testUser } from '../../test/user'
import { NgbsAuthAvatarComponent } from './avatar.component'

export default {
  title: 'AvatarComponent',
  component: NgbsAuthAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAuthAvatarComponent],
    }),
  ],
  argTypes: {
    action: {
      action: (x: unknown) => console.log(x)
    },
    props: {
      options: ['loggedIn', 'loggedOut'],
      mapping: {
        loggedIn: { user: testUser },
        loggedOut: { user: null },
      },
      control: { type: 'select' },
    },
  },
} as Meta<NgbsAuthAvatarComponent>

const Template: Story<NgbsAuthAvatarComponent> = (
  args: NgbsAuthAvatarComponent
) => ({
  template: `
  <ngbs-auth-avatar [props]="props" (action$)="action($event)"></ngbs-auth-avatar>`,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
