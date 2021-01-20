import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { PageScrollService } from "./page-scroll.service";
import { InfiniteScrollDataAdapter } from "./infinite-scroll-adapter";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data$: InfiniteScrollDataAdapter | any;

  constructor(private mockDataSource: PageScrollService) {}

  ngOnInit() {
    this.data$ = new InfiniteScrollDataAdapter(this.getSource(), 10);
  }

  getSource() {
    return (offset: any, limit: any): Observable<any> => {
      return this.mockDataSource.loadData(offset, limit).pipe(
        map((data: any) => {
          return data;
        })
      );
    };
  }

  loadMore() {
    this.data$.loadMore();
  }

  reset() {
    this.data$.reload();
  }
}
