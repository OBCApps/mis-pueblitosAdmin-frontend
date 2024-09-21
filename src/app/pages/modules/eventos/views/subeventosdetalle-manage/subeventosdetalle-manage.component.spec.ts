import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventosdetalleManageComponent } from './subeventosdetalle-manage.component';

describe('SubeventosdetalleManageComponent', () => {
  let component: SubeventosdetalleManageComponent;
  let fixture: ComponentFixture<SubeventosdetalleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubeventosdetalleManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubeventosdetalleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
