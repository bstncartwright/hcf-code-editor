class VIM {
  constructor(textarea) {
    this.textarea = textarea;
    this.mode = 'normal';
    this.cursorPosition = 0;
    this.registerEventListeners();
  }

  registerEventListeners() {
    this.textarea.addEventListener('keydown', (event) => this.handleKey(event));
  }

  handleKey(event) {
    if (this.mode === 'normal') {
      return this.handleNormalModeKey(event);
    } else if (this.mode === 'insert') {
      return this.handleInsertModeKey(event);
    }
  }

  handleNormalModeKey(event) {
    switch (event.key) {
      case 'i':
        this.enterInsertMode();
        return true;
      case 'Escape':
        this.exitInsertMode();
        return true;
      case 'h':
        this.moveCursorLeft();
        return true;
      case 'j':
        this.moveCursorDown();
        return true;
      case 'k':
        this.moveCursorUp();
        return true;
      case 'l':
        this.moveCursorRight();
        return true;
      case 'x':
        this.deleteCharacter();
        return true;
      case 'd':
        if (event.key === 'd') {
          this.deleteLine();
          return true;
        }
        break;
      case 'y':
        if (event.key === 'y') {
          this.yankLine();
          return true;
        }
        break;
      case 'p':
        this.pasteLine();
        return true;
    }
    return false;
  }

  handleInsertModeKey(event) {
    if (event.key === 'Escape') {
      this.exitInsertMode();
      return true;
    }
    return false;
  }

  enterInsertMode() {
    this.mode = 'insert';
    this.textarea.classList.add('vim-insert-mode');
  }

  exitInsertMode() {
    this.mode = 'normal';
    this.textarea.classList.remove('vim-insert-mode');
  }

  moveCursorLeft() {
    this.cursorPosition = Math.max(0, this.cursorPosition - 1);
    this.updateCursor();
  }

  moveCursorRight() {
    this.cursorPosition = Math.min(this.textarea.value.length, this.cursorPosition + 1);
    this.updateCursor();
  }

  moveCursorUp() {
    // Implement cursor movement up
  }

  moveCursorDown() {
    // Implement cursor movement down
  }

  deleteCharacter() {
    const value = this.textarea.value;
    this.textarea.value = value.slice(0, this.cursorPosition) + value.slice(this.cursorPosition + 1);
    this.updateCursor();
  }

  deleteLine() {
    // Implement line deletion
  }

  yankLine() {
    // Implement line yanking
  }

  pasteLine() {
    // Implement line pasting
  }

  updateCursor() {
    this.textarea.setSelectionRange(this.cursorPosition, this.cursorPosition);
  }

  init() {
    this.cursorPosition = this.textarea.selectionStart;
    this.updateCursor();
  }
}
