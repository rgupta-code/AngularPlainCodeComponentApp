import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor',
  imports: [CommonModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;
  @Input() editorValue: string = '';
  @Output() editorValueChange = new EventEmitter<string>();
  private commandState: { [key: string]: boolean } = {};
  public fontColor: string = '#000000'; // Default color is black
  public showEmojiPicker: boolean = false;
  public emojis: string[] = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🥺', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '👾', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
  private savedRange: Range | null = null;

  onEditorClick() {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
          this.savedRange = selection.getRangeAt(0);
      }
  }

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

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string) {
    const editor = this.editor.nativeElement;
    editor.focus();

    let selection = window.getSelection();
    let range: Range | null = this.savedRange; // Restore saved cursor position

    if (!range || !editor.contains(range.commonAncestorContainer)) {
        console.warn('Cursor position lost, inserting at the end.');
        range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false); // Move cursor to end
    }

    selection?.removeAllRanges();
    selection?.addRange(range);

    // Insert emoji at the cursor position
    const emojiNode = document.createTextNode(emoji);
    range.deleteContents();
    range.insertNode(emojiNode);

    // Move cursor after the inserted emoji
    range.setStartAfter(emojiNode);
    range.setEndAfter(emojiNode);
    selection?.removeAllRanges();
    selection?.addRange(range);

    this.showEmojiPicker = false;
    this.updateEditorValue();
}


}
