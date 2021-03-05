import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {

  constructor(
    private route: ActivatedRoute
  ) { }

  public check(param: string): boolean {
    return this.route.snapshot.queryParamMap.get(param) !== null;
  }

  public get(param: string): string {
    if (this.check(param)) {
      return this.route.snapshot.queryParamMap.get(param);
    }
    else {
      return null;
    }
  }
}
