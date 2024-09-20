import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorSelectorViewComponent } from './proveedor-selector-view.component';

describe('ProveedorSelectorViewComponent', () => {
  let component: ProveedorSelectorViewComponent;
  let fixture: ComponentFixture<ProveedorSelectorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedorSelectorViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProveedorSelectorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
