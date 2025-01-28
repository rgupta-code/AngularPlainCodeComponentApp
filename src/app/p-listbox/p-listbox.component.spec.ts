import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PListboxComponent } from './p-listbox.component';

describe('PListboxComponent', () => {
  let component: PListboxComponent;
  let fixture: ComponentFixture<PListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PListboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
