import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPlanDialogComponent } from './payment-plan-dialog.component';

describe('PaymentPlanDialogComponent', () => {
  let component: PaymentPlanDialogComponent;
  let fixture: ComponentFixture<PaymentPlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPlanDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentPlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
