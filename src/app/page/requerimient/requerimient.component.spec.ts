import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientComponent } from './requerimient.component';

describe('RequerimientComponent', () => {
  let component: RequerimientComponent;
  let fixture: ComponentFixture<RequerimientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequerimientComponent]
    });
    fixture = TestBed.createComponent(RequerimientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
