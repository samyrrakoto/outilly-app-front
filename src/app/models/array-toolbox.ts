export class ArrayToolbox {

  public generateNumberArray(end: number, start: number = 1): number[] {
    const numberArray: number[] = [];

    for (let i = start; i <= end; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }

  public getCounter(n: number): any[] {
    return new Array(n);
  }
}
