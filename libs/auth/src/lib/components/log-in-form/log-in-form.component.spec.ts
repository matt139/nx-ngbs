import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbsAuthLogInFormComponent } from './log-in-form.component';

describe(NgbsAuthLogInFormComponent.name, () => {
  let component: NgbsAuthLogInFormComponent;
  let fixture: ComponentFixture<NgbsAuthLogInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ NgbsAuthLogInFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbsAuthLogInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
