import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'passWordChange' })
export class passWordPipe implements PipeTransform {
  transform(value) {
    // return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    let str='';
    for(let a of value){
      str+='*';
    }
    return str;
  }
}




