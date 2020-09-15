import { Injectable, Injector } from '@angular/core';
import { Category } from './category.module';
import { BaseResouceService } from '../../../shared/services/base-resouce.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResouceService<Category>{

  constructor(protected injector: Injector) {
    super("api/categories", injector, Category.formJson);
  }


}
