export class Loading {
  private label: string;
  private active: boolean = false;

  constructor(label: string) {
    this.label = label;
  }

  public getLabel(): string {
    return this.label;
  }

  public getActive(): boolean {
    return this.active;
  }

  public isLoading(): boolean {
    return this.active;
  }

  public load(): void {
    this.active = true;
  }

  public unload(): void {
    this.active = false;
  }
}
