import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Validator, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/category.module';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {
  category: Category = new Category();
  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serveErroMensage: string[] = [];
  submitForm: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngAfterContentChecked(): void {
    this.setPAgeTitle();
  }

  private setPAgeTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria";
    } else {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  public submitForms() {
    this.submitForm = true;
    if (this.currentAction === "new") {
      this.createcategory();
    } else {
      this.updateCategory();
    }
  }

  updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.update(category).subscribe(
      category => this.categoryForSucesso(category),
      error => this.cateForyForError(error)
    );
  }

  private createcategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category
    ).subscribe(
      category => this.categoryForSucesso(category),
      error => this.cateForyForError(error)
    );
  }

  cateForyForError(error) {
    toastr.error("Ocorreu um erro ao processar a solicitação");

    this.submitForm = false;
    if (error.status === 422) {
      this.serveErroMensage = JSON.parse(error._body).errors;
    } else {
      this.serveErroMensage = ["falha na comunicação com o servidor. tenta mais tarde"];
    }
  }

  categoryForSucesso(category: Category): void {
    toastr.success("solicitação Processada com sucesso");

    this.router.navigateByUrl('categories', { skipLocationChange: true })
      .then(
        () => this.router.navigate(['categories', category.id, 'edit'])
      );
  }


  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);//setas os valore no formulário
        },
        (error) => alert("ocorreu um erro")
      );
    }
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null],
      description: [null]
    });
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }


}
