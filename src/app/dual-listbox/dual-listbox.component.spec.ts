import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualListboxComponent } from './dual-listbox.component';

describe('DualListboxComponent', () => {
  let component: DualListboxComponent;
  let fixture: ComponentFixture<DualListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DualListboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DualListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
