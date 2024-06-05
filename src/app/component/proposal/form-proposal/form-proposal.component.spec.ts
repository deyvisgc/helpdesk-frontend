import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProposalComponent } from './form-proposal.component';

describe('FormProposalComponent', () => {
  let component: FormProposalComponent;
  let fixture: ComponentFixture<FormProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProposalComponent]
    });
    fixture = TestBed.createComponent(FormProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
