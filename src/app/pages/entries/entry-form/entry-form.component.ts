import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.module';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Validator, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../shared/entry.module';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {
  entry: Entry = new Entry();
  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serveErroMensage: string[] = [];
  submitForm: boolean = false;
  categories: Array<Category>;

  imaskconfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {

  }

  ngAfterContentChecked(): void {
    this.setPAgeTitle();
  }

  private setPAgeTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Novo Lançamento";
    } else {
      const entryName = this.entry.name || "";
      this.pageTitle = "Editando Lançamento: " + entryName;
    }
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategory();
  }

  public submitForms() {
    this.submitForm = true;
    if (this.currentAction === "new") {
      this.createentry();
    } else {
      this.updateEntry();
    }
  }

  updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry).subscribe(
      entry => this.entryForSucesso(entry),
      error => this.cateForyForError(error)
    );
  }

  private createentry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entry
    ).subscribe(
      entry => this.entryForSucesso(entry),
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

  entryForSucesso(entry: Entry): void {
    toastr.success("solicitação Processada com sucesso");

    this.router.navigateByUrl('entries', { skipLocationChange: true })
      .then(
        () => this.router.navigate(['entries', entry.id, 'edit'])
      );
  }


  private loadEntry() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get("id")))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry);//setas os valore no formulário
        },
        (error) => alert("ocorreu um erro")
      );
    }
  }

  private loadCategory() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required, Validators.minLength(2)],
      description: [null],
      type: ["expense", Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      paid: [true, Validators.required],
      categoryId: [null, Validators.required],
    });
  }

  get typeOption(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    );
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }


}
