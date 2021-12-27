import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'ngbs-auth-change-email-form',
  template: `
    <form>
      <p>Change Email</p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsChangeEmailFormComponent {}
