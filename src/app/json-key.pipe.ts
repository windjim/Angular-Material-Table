import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonKey',
})
export class JsonKeyPipe implements PipeTransform {
  transform(json: any, key: string, undefine: any = '---'): any {
    if (json.hasOwnProperty(key)) {
      return json[key];
    } else {
      return undefine;
    }
  }
}
