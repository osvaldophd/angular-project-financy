import { Validators } from '@angular/forms';
import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.module';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Entry } from '../shared/entry.module';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.componet';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

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
    protected entryService: EntryService,
    protected categoryService:CategoryService,
    protected injector: Injector
  ) {
    super(injector, new Entry, entryService, Entry.formJson);

  }


  ngOnInit() {
    this.loadCategory();
    super.ngOnInit();
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

  private loadCategory() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
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

  protected createTitlePage(): string {
    return "Cadastro de Nova Lançamento";
  }

  editTitlePage(): string {
    const entryName = this.resource.name || ""
    return "Edição de Lançamento: "+entryName ;
  }

}
