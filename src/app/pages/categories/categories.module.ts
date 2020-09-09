import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent],
  imports: [
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
