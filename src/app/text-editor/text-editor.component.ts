import { Component } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  execCmd(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  isActive(command: string, value?: string): boolean {
    if (value) {
      return document.queryCommandValue(command) === value;
    }
    return document.queryCommandState(command);
  }

  insertImage() {
    const url = window.prompt('Enter image URL', '');
    if (url) {
      this.execCmd('insertImage', url);
    }
  }
}
