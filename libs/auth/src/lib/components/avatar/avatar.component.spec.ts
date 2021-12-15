import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { NgbsAvatarComponent } from './avatar.component'

describe(NgbsAvatarComponent.name, () => {
  let component: NgbsAvatarComponent
  let fixture: ComponentFixture<NgbsAvatarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbsAvatarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbsAvatarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
