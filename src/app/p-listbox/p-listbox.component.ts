import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-listbox',
  imports: [FormsModule, CommonModule],
  templateUrl: './p-listbox.component.html',
  styleUrl: './p-listbox.component.css'
})
export class PListboxComponent implements OnInit {
  @Input() items: { label: string; value: any }[] = [];
  @Input() selectedItems: any[] = [];
  @Input() showSearchBox = true; // Controls visibility of search box
  @Output() selectionChange = new EventEmitter<any[]>();
  @Input() multiSelect = true; // Controls whether multi-select is enabled

  public filteredItems: { label: string; value: any }[] = [];
  public searchTerm = '';

  listboxItems = [
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
    { label: 'Item 4', value: 4 },
  ];

  ngOnInit(): void {
    // Initialize filteredItems with all items
    //alert(this.items.length); 
    //this.items = [...this.listboxItems];
    this.filteredItems = [...this.items];
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems = [...this.items];
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item.value);
  }

  selectItem(item: any): void {
    if (this.multiSelect) {
      if (this.isSelected(item)) {
        this.selectedItems = this.selectedItems.filter(i => i !== item.value);
      } else {
        this.selectedItems.push(item.value);
      }
    } else {
      this.selectedItems = [item.value];
    }
    this.selectionChange.emit(this.selectedItems);
  }

  filterItems(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.label.toLowerCase().includes(search)
    );
  }
}
