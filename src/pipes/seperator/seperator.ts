import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SeperatorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'seperator',
})
export class SeperatorPipe implements PipeTransform {
  /**
   * Takes a value and replaces the ","
   */
  transform(value: string, ...args) {

    if(value != undefined){
      let str = value.replace(/\,/g, ", ");
      return str;
    }
    return value;
  }
}
