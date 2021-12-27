import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  template: `
    <h1>Settings</h1>
    <section>Change Display Name</section>
    <section>Change Photo</section>
    <section>Change Email</section>
    <section>Change Password</section>
    <section>Delete Account</section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgbsAuthSettingsView {}
