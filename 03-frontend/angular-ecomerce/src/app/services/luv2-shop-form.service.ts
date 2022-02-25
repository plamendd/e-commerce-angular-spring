import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number []>{
    let data: number [] = [];

    //build ana array for Month dropdown
    //-start at current month and loop until

    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number []>{
    let data: number[] = [];
    //build ana array for years downlist
    //-start from curret nyear and loop for the nex 10

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++ ){
      data.push(theYear);

    }
    return of(data);
    
  }

}
