import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { NgbsAuthSignUpFormComponent } from './sign-up-form.component'

describe(NgbsAuthSignUpFormComponent.name, () => {
  let component: NgbsAuthSignUpFormComponent
  let fixture: ComponentFixture<NgbsAuthSignUpFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [NgbsAuthSignUpFormComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbsAuthSignUpFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
