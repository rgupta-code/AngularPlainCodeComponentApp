import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;
  @Input() editorValue: string = '';
  @Output() editorValueChange = new EventEmitter<string>();
  private commandState: { [key: string]: boolean } = {};
  public fontColor: string = '#000000'; // Default color is black

  ngAfterViewInit() {
    this.editor.nativeElement.innerHTML = this.editorValue;
  }

  execCmd(command: string, value?: string) {
    document.execCommand(command, false, value);
    this.updateCommandState(command, value);
    this.updateEditorValue();
  }

  isActive(command: string, value?: string): boolean {
    if (value) {
      return this.commandState[`${command}-${value}`] || false;
    }
    return this.commandState[command] || false;
  }

  private updateCommandState(command: string, value?: string) {
    if (value) {
      this.commandState[`${command}-${value}`] = document.queryCommandValue(command) === value;
    } else {
      this.commandState[command] = document.queryCommandState(command);
    }
  }

  public updateEditorValue() {
    this.editorValue = this.editor.nativeElement.innerHTML;
    this.editorValueChange.emit(this.editorValue);
  }

  insertImage() {
    const url = window.prompt('Enter image URL', '');
    if (url) {
      this.execCmd('insertImage', url);
    }
  }

  changeFontColor(color: string) {
    this.fontColor = color;
    this.execCmd('foreColor', color);
  }
}
