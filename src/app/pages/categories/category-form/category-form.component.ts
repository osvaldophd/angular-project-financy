import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Validator, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/category.module';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";

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
  if(this.currentAction == "new"){
    this.pageTitle = "Cadastro de Nova Categoria";
  }else{
    const categoryName = this.category.name || "";
    this.pageTitle = "Editando Categoria: "+categoryName;
  }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
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
