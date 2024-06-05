import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRequerimientComponent } from './form-requerimient.component';

describe('FormRequerimientComponent', () => {
  let component: FormRequerimientComponent;
  let fixture: ComponentFixture<FormRequerimientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRequerimientComponent]
    });
    fixture = TestBed.createComponent(FormRequerimientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
