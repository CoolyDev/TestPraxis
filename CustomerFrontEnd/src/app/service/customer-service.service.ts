import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CustomerModel, PageModel} from "../model/customer.model";
import {catchError,map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl:string="http://localhost:8080/"
  constructor(private http:HttpClient) {
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getAllCustomer(): Observable<CustomerModel[]>{
    return this.http.get<CustomerModel[]>(this.apiUrl+'Customer')
      .pipe(
        catchError(this.handleError('getCustomer', []))
      );
  }
  getPagesCustomer(sort: string, order: string, page: number): Observable<PageModel> {
    const href = 'http://localhost:8080/customerPagined';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<PageModel>(requestUrl);
  }
}
