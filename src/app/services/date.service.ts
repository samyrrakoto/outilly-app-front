import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor()
  {}

  public getTimestamp(date: Date): number {
    return +Math.floor(date.getTime() / 1000).toString()
  }
}
