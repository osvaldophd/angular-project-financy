import {InMemoryDbService} from "angular-in-memory-web-api";
import { Entry } from './pages/entries/shared/entry.module';
import {Category} from "./pages/categories/shared/category.module";
export class InMemoryDataBase implements InMemoryDbService{
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
        name: "Freela",
        description: "Trabalho de frelar"
      }
    ];

    const entries: Entry[]=[
      {
        id: 1,
        name: "Gás de cozinha",
        categoryId: categories[1].id,
        category: categories[1],
        paid: true,
        date: "15/09/2020",
        amount: "170.09",
        type: "expense",
        description: "Gás económico"
      } as Entry,
      {
        id: 2,
        name: "Suplemento",
        categoryId: categories[0].id,
        category: categories[0],
        paid: false,
        date: "05/09/2020",
        amount: "70.09",
        type: "expense",
        description: "Suplemento"
      } as Entry,
      {
        id: 3,
        name: "Uber",
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: "05/09/2020",
        amount: "70.09",
        type: "renevue",
        description: "Transporte"
      } as Entry,
      {
        id: 4,
        name: "Aluger de casa",
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: "25/08/2020",
        amount: "100.09",
        type: "renevue",
        description: "PAgamento de conta de casa"
      } as Entry,
      {
        id: 5,
        name: "Gasosa",
        categoryId: categories[3].id,
        category: categories[3],
        paid: false,
        date: "06/09/2020",
        amount: "90.09",
        type: "renevue",
        description: "PAgamento de conta"
      } as Entry,
      {
        id: 6,
        name: "Aluguer de filme",
        categoryId: categories[2].id,
        category: categories[2],
        paid: false,
        date: "05/03/2020",
        amount: "70.09",
        type: "renevue",
        description: "PAgamento de conta"
      } as Entry,
      {
        id: 7,
        name: "Colher de cozinha",
        categoryId: categories[4].id,
        category: categories[4],
        paid: true,
        date: "09/09/2020",
        amount: "90.87",
        type: "expense",
        description: "PAgamento"
      } as Entry,
      {
        id: 8,
        name: "Cinema",
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: "05/11/2020",
        amount: "90.87",
        type: "expense",
        description: "PAgamento"
      } as Entry,
      {
        id: 9,
        name: "JAntar no restaurante",
        categoryId: categories[4].id,
        category: categories[4],
        paid: true,
        date: "05/09/2019",
        amount: "781.09",
        type: "expense",
        description: "PAgamento"
      } as Entry
    ];

    return {categories, entries}
  }
}
