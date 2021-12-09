import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export class SignUpForm extends FormGroup {
  constructor() {
    super(
      {
        emailAddress: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordConfirm: new FormControl('', Validators.required),
      },
      {
        validators: passwordsMatchValidator,
      }
    );
  }
}

export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
) => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  const controlsTouched = password?.touched && passwordConfirm?.touched;
  if (controlsTouched && password?.value === passwordConfirm?.value) {
    return null;
  } else {
    return {
      passwordMismatch: true,
    };
  }
};
