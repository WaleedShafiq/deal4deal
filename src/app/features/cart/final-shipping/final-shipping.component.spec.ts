import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalShippingComponent } from './final-shipping.component';

describe('FinalShippingComponent', () => {
  let component: FinalShippingComponent;
  let fixture: ComponentFixture<FinalShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
