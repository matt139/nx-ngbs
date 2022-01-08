import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgbsUpdateEmailFormComponent } from './update-email-form.component'

describe(NgbsUpdateEmailFormComponent.name, () => {
  let component: NgbsUpdateEmailFormComponent
  let fixture: ComponentFixture<NgbsUpdateEmailFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbsUpdateEmailFormComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NgbsUpdateEmailFormComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
      })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
