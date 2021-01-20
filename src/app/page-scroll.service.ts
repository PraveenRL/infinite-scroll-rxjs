import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PageScrollService {
  totalElement = 100;

  public loadData(offset: any, limit: any) {
    return new Observable(subscriber => {
      subscriber.next({
        data: this.getIndexedArray(limit, offset),
        totalElement: this.totalElement
      });
    }).pipe(delay(1000));
  }

  private getIndexedArray(limit: number, offset: number) {
    // limit if reaches the top element
    limit = Math.min(offset + limit, this.totalElement) - offset;
    if (limit <= 0) {
      return [];
    }
    return new Array(limit).fill(null).map((val, index) => {
      return {
        name: "Item " + (index + 1 + offset)
      };
    });
  }
}
