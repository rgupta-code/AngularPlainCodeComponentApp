import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dual-listbox',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dual-listbox.component.html',
  styleUrls: ['./dual-listbox.component.css']
})
export class DualListboxComponent implements OnInit, OnChanges {
  @Input() availableItems: { label: string; value: any }[] = [];
  @Input() selectedItems: { label: string; value: any }[] = [];
  @Input() showSearchBox = true; // Controls visibility of search box
  @Output() selectionChange = new EventEmitter<{ label: string; value: any }[]>();

  public availableFilteredItems: { label: string; value: any }[] = [];
  public selectedFilteredItems: { label: string; value: any }[] = [];
  public availableSearchTerm = '';
  public selectedSearchTerm = '';
  public selectedItem: { label: string; value: any } | null = null;
  private originalOrder: { label: string; value: any }[] = [];

  ngOnInit(): void {
    this.availableFilteredItems = [...this.availableItems];
    this.selectedFilteredItems = [...this.selectedItems];
    this.originalOrder = JSON.parse(JSON.stringify(this.availableItems)); // Create a deep copy of the original items
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableItems']) {
      this.originalOrder = JSON.parse(JSON.stringify(this.availableItems)); // Update the deep copy if availableItems changes
    }
  }

  filterItems(list: 'available' | 'selected'): void {
    if (list === 'available') {
      this.availableFilteredItems = this.availableItems.filter(item =>
        item.label.toLowerCase().includes(this.availableSearchTerm.toLowerCase())
      );
    } else {
      this.selectedFilteredItems = this.selectedItems.filter(item =>
        item.label.toLowerCase().includes(this.selectedSearchTerm.toLowerCase())
      );
    }
  }

  selectItem(item: { label: string; value: any }): void {
    this.selectedItem = item;
  }

  moveToSelected(): void {
    if (this.selectedItem) {
      this.availableItems = this.availableItems.filter(i => i !== this.selectedItem);
      this.selectedItems.push(this.selectedItem);
      this.sortItems();
      this.selectedItem = null;
      this.filterItems('available');
      this.filterItems('selected');
      this.selectionChange.emit(this.selectedItems);
    }
  }

  moveToAvailable(): void {
    if (this.selectedItem) {
      this.selectedItems = this.selectedItems.filter(i => i !== this.selectedItem);
      this.availableItems.push(this.selectedItem);
      this.sortItems();
      this.selectedItem = null;
      this.filterItems('available');
      this.filterItems('selected');
      this.selectionChange.emit(this.selectedItems);
    }
  }

  moveAllToSelected(): void {
    this.selectedItems = [...this.selectedItems, ...this.availableItems];
    this.availableItems = [];
    this.sortItems();
    this.selectedItem = null;
    this.filterItems('available');
    this.filterItems('selected');
    this.selectionChange.emit(this.selectedItems);
  }

  moveAllToAvailable(): void {
    this.availableItems = [...this.availableItems, ...this.selectedItems];
    this.selectedItems = [];
    this.sortItems();
    this.selectedItem = null;
    this.filterItems('available');
    this.filterItems('selected');
    this.selectionChange.emit(this.selectedItems);
  }

  private sortItems(): void {
    this.availableItems.sort((a, b) => this.originalOrder.findIndex(item => item.value === a.value) - this.originalOrder.findIndex(item => item.value === b.value));
    this.selectedItems.sort((a, b) => this.originalOrder.findIndex(item => item.value === a.value) - this.originalOrder.findIndex(item => item.value === b.value));
  }
}
