import { Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "./service/customer-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  customers
  displayedColumns: string[] = ['id', 'nom'];
  constructor(private _httpClient: HttpClient,private customerService:CustomerService) {}
  ngOnInit() {
    this.displayAllCustomers()
  }
  private displayAllCustomers(){
    this.customerService.getAllCustomer().subscribe(customer=>{
      this.customers=customer
      console.log(this.customers)
    })
  }
}
