import {AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {CustomerService} from "./service/customer-service.service";
import {CustomerModel, PageModel} from "./model/customer.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators'
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nom'];
  dataSource = new MatTableDataSource<CustomerModel>();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false
  data: CustomerModel[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private customerService: CustomerService, private _httpClient: HttpClient) {
  }

  ngOnInit() {
    this.customerService.getAllCustomer().subscribe(data => {
      this.dataSource = new MatTableDataSource<CustomerModel>(data);
      this.dataSource.paginator = this.paginator;
      merge(this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            return this.customerService!.getPagesCustomer(
              this.sort.active, this.sort.direction, this.paginator.pageIndex);
          }),
          map(data => {
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
            this.resultsLength = data.totalElements;

            return data.items;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => this.data = data);

    })
  }
}
