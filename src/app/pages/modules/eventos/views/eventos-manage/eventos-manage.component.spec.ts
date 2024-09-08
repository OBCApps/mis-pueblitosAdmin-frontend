import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosManageComponent } from './eventos-manage.component';

describe('EventosManageComponent', () => {
  let component: EventosManageComponent;
  let fixture: ComponentFixture<EventosManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventosManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
