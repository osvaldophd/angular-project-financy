import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { BaseResouceService } from '../../../shared/services/base-resouce.service';
import { CategoryService } from './../../categories/shared/category.service';
import { Entry } from './entry.module';
import { flatMap } from 'rxjs/operators';

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
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry)//retorna um observeable<entry> o flatMap achata os observable
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return super.create(entry)
      })
    );
  }
}
