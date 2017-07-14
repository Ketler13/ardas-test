import { Pipe, PipeTransform } from '@angular/core';

import { Task } from './task';

@Pipe({
  name: 'onlyActive'
})
export class OnlyActivePipe implements PipeTransform {

  transform(value: Task[]): Task[] {
    if (Array.isArray(value)) {
      return value.filter(task => task.obj_status === 'active');
    }
    throw new Error('Just array can be tranformed');
  }

}
