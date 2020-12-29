export class ErrorManager {
  public messages: string[];

  constructor() {
    this.messages = [];
  }

  private isMessageExisting(message: string): boolean {
    for (const errorMessage of this.messages) {
      if (message === errorMessage) {
        return true;
      }
    }
    return false;
  }

  public addErrorMessage(message: string): void {
    if (!this.isMessageExisting(message)) {
      this.messages.push(message);
    }
  }

  public removeErrorMessage(message: string): void {
    for (let i=0; i<this.messages.length; i++) {
      if (message === this.messages[i]) {
        this.messages.splice(i, 1);
      }
    }
  }
}
