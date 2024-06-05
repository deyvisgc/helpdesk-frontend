import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripconcomponentComponent } from './descripconcomponent.component';

describe('DescripconcomponentComponent', () => {
  let component: DescripconcomponentComponent;
  let fixture: ComponentFixture<DescripconcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescripconcomponentComponent]
    });
    fixture = TestBed.createComponent(DescripconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
