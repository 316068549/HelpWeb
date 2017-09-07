import { Pipe, PipeTransform } from '@angular/core';

import { Wearer } from '../../models/wearer';

@Pipe({ name: 'timeChange' })
export class timeChangePipe implements PipeTransform {
  transform(value) {
    return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  }

}




