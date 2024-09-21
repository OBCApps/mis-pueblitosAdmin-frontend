import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventosManageComponent } from './subeventos-manage.component';

describe('SubeventosManageComponent', () => {
  let component: SubeventosManageComponent;
  let fixture: ComponentFixture<SubeventosManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubeventosManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubeventosManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
