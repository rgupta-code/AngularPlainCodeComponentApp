import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PCalendarComponent } from './p-calendar.component';

describe('PCalendarComponent', () => {
  let component: PCalendarComponent;
  let fixture: ComponentFixture<PCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
