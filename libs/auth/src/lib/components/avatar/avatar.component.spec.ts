import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgbsAuthAvatarComponent } from './avatar.component'

describe(NgbsAuthAvatarComponent.name, () => {
  let component: NgbsAuthAvatarComponent
  let fixture: ComponentFixture<NgbsAuthAvatarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbsAuthAvatarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbsAuthAvatarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
