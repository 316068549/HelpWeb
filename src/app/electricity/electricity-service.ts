import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';




import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Electricity } from '../models/Electricity';
import { Electricitiess } from '../mock-data/mock-electricities'

@Injectable()

export class ElectricityService {
  private headers = new Headers({'Content-Type': 'application/x-www-from-urlencoded'});
  private headers2 = new Headers({'Content-Type': 'application/json'});

  private  electricityUrl = '/api/query/messageAll';
  private  electricitiesUrl = '/api/query/messageNow';
  dataed:Object;

  constructor(public http:Http
  ){}


  // getElectricities(): Observable<Electricity[]> {
  //   return this.http.get(this.electricitiesUrl)
  //     .map(res => {
  //               console.log(res);
  //             let result=res.json();
  //             console.log(result);
  //             return result;
  //           })
  // }


  getElectricities(): Promise<Electricity[]> {
  return this.http.post(this.electricitiesUrl,this.headers2)
    .toPromise()
    .then(response => response .json().objectbean as Electricity[])
    .catch(this.handleError);
}

  getElectricity(deviceIMEI: string,startTime?:string,endTime?:string): Promise<Electricity> {
    console.log(deviceIMEI)
    // const creds = ''+deviceIMEI;
    return this.http.post(this.electricityUrl,{imeiCode:deviceIMEI,startTime:startTime,endTime:endTime},this.headers2)
      .toPromise()
        .then(response => response.json().objectbean as Electricity)
        .catch(this.handleError);

  }

  search(IMEI: string): Observable<Electricity[]> {
    return this.http.post(this.electricitiesUrl,{imeiCode:IMEI},this.headers2)
        .map(res => {
            console.log(res);
            let result=res.json().objectbean;
            console.log(result);
            return result;
              })

    // return this.getElectricities()
    //     .then(menus => menus.find(menu => menu.id === id));

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  }





// }
