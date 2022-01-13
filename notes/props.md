Even simple angular components can begin to accumulate `@Input()`s pretty
quickly. say we have some kind of form for a user

```typescript
class UserFormComponent implements OnInit, OnChanges {
  @Input()
  user: User

  @Input()
  isDarkMode: boolean

  @Input()
  size: number

  @Input()
  loggingInfo: object

  @Input()
  companyStuff: unknown

  form: UserForm

  ngOnInit() {
    this.form = new FormGroup(this.user)
  }
}
```

This can become difficult to manage and cause parent component templates to
swell up with input declarations

```typescript
@Component({
  template: `
    <user-form-component
      [user]="user"
      [isDarkMode]="isUserFormDarkMode"
      [size]="userFormSize"
      [loggingInfo]="userLog"
      [companyStuff]="userFormCompanyStuff"
    >
    </user-form-component>
    <cat-form-component
      [cat]="cat"
      [isDarkMode]="true"
      [size]="10"
      [loggingInfo]="catLog"
      [companyStuff]="null"
    >
    </cat-form-component>
  `,
})
class ParentComponent {
  public user = user
  public isUserFormDarkMode = true
  public userFormSize = 3
  public userLog = { isVip: false }
  public userFormCompanyStuff = undefined
  public cat = cat
  public isCatFormDarkMode = true
  public catFormSize = 10
  public catLog = { lovesSnuggles: true }
  public catFormCompanyStuff = { business: 'important' }
}
```

It begins to make sense to combine these inputs into an object and provide a
single `Input()` instead. Lets call this input `props` and define an
appropriate interface for our component and export it so consumers know exactly
what we want

```typescript
class UserFormComponent implements OnInit {
  @Input()
  props: UserFormComponentProps

  form: UserForm

  ngOnInit() {
    this.form = new UserForm(this.props.user)
  }
}

interface UserFormComponentProps {
  user: User
  isDarkMode: boolean
  size: number
  loggingInfo: object
  companyStuff: unknown
}
```

This removes extra code from our ParentComponent, as well as allowing us to provide type definitions

```typescript
@Component({
  template: `
    <user-form-component [props]="userFormProps"> </user-form-component>
    <cat-form-component [props]="catFormProps"> </cat-form-component>
  `,
})
class ParentComponent {
  public userFormProps: UserFormComponentProps = {
    user: user,
    isDarkMode: true,
    size: 3,
    loggingInfo: { isVip: false },
    companyStuff: undefined,
  }

  public catFormProps: CatFormComponentProps = {
    cat: cat,
    isDarkMode: true,
    size: 10,
    loggingInfo: { lovesSnuggles: true },
    companyStuff: { business: 'important' },
  }
}
```
