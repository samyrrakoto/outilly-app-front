import { Loading } from "src/app/models/loading";

export class Loadings {
  private loadings: Loading[] = [];

  public get(label: string): Loading {
    for (const loading of this.loadings) {
      if (label === loading.getLabel()) {
        return loading;
      }
    }
    return null;
  }

  public add(label: string): void {
    if (!this.get(label)) {
      this.loadings.push(new Loading(label));
    }
  }

  public remove(label: string): void {
    for (let i = 0; i < this.loadings.length; i++) {
      if (label === this.loadings[i].getLabel()) {
        this.loadings.splice(i, 1);
      }
    }
  }

  public isLoading(label: string): boolean {
    return this.get(label).isLoading();
  }

  public load(label: string): void {
    this.get(label).load();
  }

  public unload(label: string): void {
    this.get(label).unload();
  }
}
