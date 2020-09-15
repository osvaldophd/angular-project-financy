import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Category extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string
  ) {
    super();
  }
  static formJson(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}
