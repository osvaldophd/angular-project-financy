import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'entries',
    loadChildren: './pages/entries/entries.module#EntriesModule'
  },
  {
    path: 'categories',
    loadChildren: './pages/categories/categories.module#CategoriesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // {useHash:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
