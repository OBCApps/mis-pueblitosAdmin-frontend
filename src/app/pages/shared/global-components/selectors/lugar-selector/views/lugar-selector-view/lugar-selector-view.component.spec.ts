import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarSelectorViewComponent } from './lugar-selector-view.component';

describe('LugarSelectorViewComponent', () => {
  let component: LugarSelectorViewComponent;
  let fixture: ComponentFixture<LugarSelectorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LugarSelectorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LugarSelectorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
