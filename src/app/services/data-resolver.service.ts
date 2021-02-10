import { DataService } from './data.service';
import {  Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataService: DataService) { }


  resolve(route: ActivatedRouteSnapshot){
    let id = route.paramMap.get('id');
    return this.dataService.getData(id);
  }
}
