import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleBoxComponent } from './collapsible-box.component';

describe('CollapsibleBoxComponent', () => {
  let component: CollapsibleBoxComponent;
  let fixture: ComponentFixture<CollapsibleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsibleBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsibleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
