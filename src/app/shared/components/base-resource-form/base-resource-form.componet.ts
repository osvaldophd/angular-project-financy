import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResouceService } from '../../services/base-resouce.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serveErroMensage: string[] = [];
  submitForm: boolean = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResouceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPAgeTitle();
  }

  public submitForms() {
    this.submitForm = true;

    if (this.currentAction === "new") {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      this.currentAction = "edit";
    }
  }

  protected loadResource() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);//setas os valore no formulário
        },
        (error) => alert("ocorreu um erro")
      );
    }
  }

  protected setPAgeTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = this.createTitlePage();
    } else {
      this.pageTitle = this.editTitlePage();
    }
  }

  protected editTitlePage(): string {
    return "Edição";
  }

  protected createTitlePage(): string {
    return "Novo";
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource
    ).subscribe(
      resource => this.actionForSucess(resource),
      error => this.actionForError(error)
    );
  }

  public updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      resource => this.actionForSucess(resource),
      error => this.actionForError(error)
    );
  }

  actionForSucess(resource: T): void {
    toastr.success("solicitação Processada com sucesso");
    const baseCompontPath: string = this.route.snapshot.parent[0].path;

    this.router.navigateByUrl(baseCompontPath, { skipLocationChange: true })
      .then(
        () => this.router.navigate([baseCompontPath, resource.id, 'edit'])
      );
  }

  actionForError(error) {
    toastr.error("Ocorreu um erro ao processar a solicitação");

    this.submitForm = false;
    if (error.status === 422) {
      this.serveErroMensage = JSON.parse(error._body).errors;
    } else {
      this.serveErroMensage = ["falha na comunicação com o servidor. tenta mais tarde"];
    }
  }

  protected abstract buildResourceForm(): void
}
