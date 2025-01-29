import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PListboxComponent } from './p-listbox/p-listbox.component';
import { DualListboxComponent } from './dual-listbox/dual-listbox.component';
import { CollapsibleBoxComponent } from './collapsible-box/collapsible-box.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PCalendarComponent } from './p-calendar/p-calendar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, PListboxComponent, DualListboxComponent, PCalendarComponent, CollapsibleBoxComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'MyFirstApp';
  public listboxItems: { label: string; value: any }[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Cherry', value: 3 },
    { label: 'Date', value: 4 },
    { label: 'Elderberry', value: 5 },
    { label: 'Fig', value: 6 },
    { label: 'Grape', value: 7 },
    { label: 'Honeydew', value: 8 },
    { label: 'Kiwi', value: 9 },
    { label: 'Lemon', value: 10 },
  ];

  selectedItems: any[] = [];
}
