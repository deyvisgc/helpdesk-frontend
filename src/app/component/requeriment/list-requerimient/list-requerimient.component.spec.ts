import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequerimientComponent } from './list-requerimient.component';

describe('ListRequerimientComponent', () => {
  let component: ListRequerimientComponent;
  let fixture: ComponentFixture<ListRequerimientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRequerimientComponent]
    });
    fixture = TestBed.createComponent(ListRequerimientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
