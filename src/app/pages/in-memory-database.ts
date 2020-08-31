import {InMemoryDbService} from "angular-in-memory-web-api";

export class InMemoryDataBase implements InMemoryDataBase{
  createDb(){
    const categories=[
      {
        id: 1,
        nome: "Moradia",
        descricao: "PAgamento de conta de casa"
      },
      {
        id: 2,
        nome: "Saúde",
        descricao: "Plano de saúde e remedio"
      },
      {
        id: 3,
        nome: "Lazer",
        descricao: "Cinema,praia,parques,etc"
      },
      {
        id: 4,
        nome: "Salário",
        descricao: "Recebimento de salário"
      },
      {
        id: 5,
        nome: "Freela",
        descricao: "Trabalho de frelar"
      }
    ];

    return {categories}
  }
}
