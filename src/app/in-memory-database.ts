import {InMemoryDbService} from "angular-in-memory-web-api";
import {Category} from "./pages/categories/shared/category.module";
export class InMemoryDataBase implements InMemoryDataBase{
  createDb(){
    const categories: Category[]=[
      {
        id: 1,
        name: "Moradia",
        description: "PAgamento de conta de casa"
      },
      {
        id: 2,
        name: "Saúde",
        description: "Plano de saúde e remedio"
      },
      {
        id: 3,
        name: "Lazer",
        description: "Cinema,praia,parques,etc"
      },
      {
        id: 4,
        name: "Salário",
        description: "Recebimento de salário"
      },
      {
        id: 5,
        nome: "Freela",
        description: "Trabalho de frelar"
      }
    ];

    return {categories}
  }
}
