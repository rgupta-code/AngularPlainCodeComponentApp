// filepath: /C:/MyFiles/MyProjects/AiComponents/AngularPlainCodeComponentApp/src/app/rich-text-editor/rich-text-editor.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent {
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