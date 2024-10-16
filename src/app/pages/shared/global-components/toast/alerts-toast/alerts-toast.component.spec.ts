import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsToastComponent } from './alerts-toast.component';

describe('AlertsToastComponent', () => {
  let component: AlertsToastComponent;
  let fixture: ComponentFixture<AlertsToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertsToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
