import { FormControl, FormGroup } from '@angular/forms'

export class UpdateEmailForm extends FormGroup {
  constructor(init: { currentEmail?: string | null } = {}) {
    super({
      newEmail: new FormControl(init.currentEmail),
    })
  }
}
