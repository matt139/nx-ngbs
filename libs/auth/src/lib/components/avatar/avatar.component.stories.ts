import { ReactiveFormsModule } from '@angular/forms'
import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { anonymousUser, testUser } from '../../models/user'
import { NgbsAvatarComponent } from './avatar.component'

export default {
  title: 'AvatarComponent',
  component: NgbsAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAvatarComponent],
    }),
  ],
  argTypes: {
    action: {
      action: () => void 0,
    },
    props: {
      options: ['anonymousUser', 'testUser'],
      mapping: {
        anonymousUser: { user: null },
        testUser: { user: testUser },
      },
      control: { type: 'select' },
    },
  },
} as Meta<NgbsAvatarComponent>

const Template: Story<NgbsAvatarComponent> = (args: NgbsAvatarComponent) => ({
  template: `
  <ngbs-avatar [props]="props"></ngbs-avatar>`,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
