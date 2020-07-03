export class CustomerModel {
  id:number;
  nom:string;
}

export class PageModel {
  items : CustomerModel[];
  totalPages : number;
  totalElements : number;
  last : boolean;
  size : number ;
  first : boolean ;
  sort : string ;
  numberOfElements : number ;
}
