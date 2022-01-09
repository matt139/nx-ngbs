import { UncheckOnDocumentClickDirective } from '@ngbs/utils'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { testUser } from '../../test/user'
import { NgbsAuthAvatarComponent } from './avatar.component'

export default {
  title: 'AvatarComponent',
  component: NgbsAuthAvatarComponent,
  decorators: [
    moduleMetadata({
      declarations: [NgbsAuthAvatarComponent, UncheckOnDocumentClickDirective],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
    props: {
      options: ['loggedIn', 'loggedOut'],
      mapping: {
        loggedIn: { user: testUser },
        loggedOut: { user: null },
      },
      control: { type: 'radio' },
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
