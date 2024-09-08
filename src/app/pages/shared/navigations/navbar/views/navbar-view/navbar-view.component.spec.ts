import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarViewComponent } from './navbar-view.component';

describe('NavbarViewComponent', () => {
  let component: NavbarViewComponent;
  let fixture: ComponentFixture<NavbarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
