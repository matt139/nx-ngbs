import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { NgbsProfileComponent } from './profile.component'

describe(NgbsProfileComponent.name, () => {
  let component: NgbsProfileComponent
  let fixture: ComponentFixture<NgbsProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgbsProfileComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbsProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

