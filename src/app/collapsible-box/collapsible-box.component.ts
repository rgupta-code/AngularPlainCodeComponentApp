import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'collapsible-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collapsible-box.component.html',
  styleUrls: ['./collapsible-box.component.css']
})
export class CollapsibleBoxComponent {
  @Input() title: string = '';
  public isCollapsed: boolean = false;

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
