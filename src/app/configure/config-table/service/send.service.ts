import { Injectable } from '@angular/core';
declare var $: any;
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config } from '../../../models/config';

@Injectable()
export class SendService{
    constructor(private http: Http){
    };
    send(term:Object):Observable<Config[]>{
        console.log(JSON.stringify(term))
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let configUrl = "/api/request/config";
        return this.http.post(configUrl,term,headers)
            .map(res =>{
                let result=res.json();
                console.log(result);
                return result;
            })
            //.catch((error:any) => {
            //    alert(error);
            //});
    }
    send2(params:Object):Observable<Config[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let configUrl = "/api/request/responseQuery";
        console.log(JSON.stringify(params))
        return this.http.post(configUrl,params,headers)
            //.subscribe(
            //    data => console.log(data),
            //    err => console.log(err),
            //    () => console.log('Register Complete')
            .map(res =>{
                let result=res.json();
                console.log(result);
                return result;
            })
    }

  searchPaper(term:Object):Observable<Config[]> {
    console.log(JSON.stringify(term))
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let configUrl = "/api/request/messageQuery";

    return this.http.post(configUrl,term,headers)
      .map(res => {
        let result=res.json();
        console.log(result);
        return result;
      })
    //.subscribe(
    //    data => console.log(data),
    //    err => console.log(err),
    //    () => console.log('Register Complete')
    //);
  }
  send3(params:Object):Observable<Config[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let configUrl = "/api/request/responseQuery";
    console.log(JSON.stringify(params))
    return this.http.post(configUrl,params,headers)
    //.subscribe(
    //    data => console.log(data),
    //    err => console.log(err),
    //    () => console.log('Register Complete')
      .map(res =>{
        let result=res.json();
        console.log(result);
        return result;
      })
  }
    private handleError(error:any):Promise<any> {
        console.error('An error occurred',error);
        alert(error)
        return Promise.reject(error.message || error);
    }

}
