import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventosListComponent } from './subeventos-list.component';

describe('SubeventosListComponent', () => {
  let component: SubeventosListComponent;
  let fixture: ComponentFixture<SubeventosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubeventosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubeventosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
