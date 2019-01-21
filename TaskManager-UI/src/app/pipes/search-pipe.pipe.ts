import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class SearchPipePipe implements PipeTransform {

  transform(items: any[], state: string): any {
    if (!state) {
      return items;
    }
    if (items) {
      console.log(items);

      return items.filter(item => {
        const keys = Object.keys(items[0]);
        for (const key of keys) {
          // console.log("Key: " + key]);
          // console.log("state: " + state);
          const val = item[key] + '';
          if (key !== '_id' && key !== 'tasks' && key !== 'completedTasks' && key !== 'manager' && key !== "__v" && key !== 'completed' && val.toLowerCase().indexOf(state.toLowerCase()) >= 0) {
            return true;
          }

        }
        return false;
      });
    } else {
      return [];
    }

  }

}
