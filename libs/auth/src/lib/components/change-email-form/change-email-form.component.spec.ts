import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgbsChangeEmailFormComponent } from './change-email-form.component'

describe(NgbsChangeEmailFormComponent.name, () => {
  let component: NgbsChangeEmailFormComponent
  let fixture: ComponentFixture<NgbsChangeEmailFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbsChangeEmailFormComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NgbsChangeEmailFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
      })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
