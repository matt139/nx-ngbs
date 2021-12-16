import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SelectStylesheetDirective } from './select-stylesheet.directive'

@Component({
  selector: 'test-component',
  template: ` <select ngbsSelectStylesheet></select> `,
})
class TestComponent {}

describe('SelectStylesheetDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectStylesheetDirective, TestComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
      })
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
