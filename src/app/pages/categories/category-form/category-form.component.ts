import { CategoryService } from './../shared/category.service';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category } from '../shared/category.module';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.componet';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Category, categoryService, Category.formJson);

  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null]
    });
  }

  protected createTitlePage(): string {
    return "Cadastro de Nova Categoria";
  }

  editTitlePage(): string {
    const categoryName = this.resource.name || ""
    return "Edição de Categoria: "+categoryName ;
  }
}
