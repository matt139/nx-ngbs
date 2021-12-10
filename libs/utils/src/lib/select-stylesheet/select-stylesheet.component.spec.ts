import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStylesheetComponent } from './select-stylesheet.component';

describe('SelectStylesheetComponent', () => {
  let component: SelectStylesheetComponent;
  let fixture: ComponentFixture<SelectStylesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStylesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStylesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
