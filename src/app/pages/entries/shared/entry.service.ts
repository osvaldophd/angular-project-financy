import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResouceService } from '../../../shared/services/base-resouce.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.module';
import { flatMap, , catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResouceService<Entry>{

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super("api/entries", injector, Entry.formJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
    // return this.categoryService.getById(entry.categoryId).pipe(
    //   flatMap(category => {
    //     entry.category = category;
    //     return super.create(entry)//retorna um observeable<entry> o flatMap achata os observable
    //   })
    // );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.setCategoryAndSendToServer(entry, super.update.bind(this))

    // return this.categoryService.getById(entry.categoryId).pipe(
    //   flatMap(category => {
    //     entry.category = category;
    //     return super.update(entry)
    //   })
    // );
  }
  private setCategoryAndSendToServer(entry: Entry, sendFn: any): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry)//retorna um observeable<entry> o flatMap achata os observable
      }),
      catchError(this.handleError)
    );
  }
}
