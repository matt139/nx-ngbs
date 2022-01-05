import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UncheckOnDocumentClickDirective } from './uncheck-on-document-click.directive'

export default {
  title: 'UncheckOnDocumentClickDirective',
  component: UncheckOnDocumentClickDirective,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [UncheckOnDocumentClickDirective],
    }),
  ],
} as Meta<UncheckOnDocumentClickDirective>

const Template: Story<UncheckOnDocumentClickDirective> = (
  args: UncheckOnDocumentClickDirective
) => ({
  template: `
    <style>
    input:checked + .input-toggle {
      display:block !important;
    }
    </style>

    <div class="d-flex flex-row">
      <div class="position-relative">
        <label for="toggle-menu-1">Menu 1</label>
        <input type="checkbox" ngbsUncheckOnDocumentClick id="toggle-menu-1" class="d-none">
        <ul class="position-absolute d-none input-toggle"> 
          <li>menu item</li>
          <li>menu item</li>
          <li>menu item</li>
        </ul> 
      </div>

      <div class="position-relative">
        <label for="toggle-menu-2">Menu 2</label>
        <input type="checkbox" ngbsUncheckOnDocumentClick id="toggle-menu-2" class="d-none">
        <ul class="position-absolute d-none input-toggle"> 
          <li>menu item</li>
          <li>menu item</li>
          <li>menu item</li>
        </ul> 
      </div>
  </div>
  `,
  component: UncheckOnDocumentClickDirective,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
