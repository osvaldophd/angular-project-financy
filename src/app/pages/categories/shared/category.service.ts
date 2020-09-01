import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from './category.module';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = "api/categories";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategories)
    );
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    );
  }

  create(category: Category): Observable<Category>{
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataCategory)
    );
  }

  update(category: Category): Observable<Category>{
    const url = `${this.apiPath}/${category.id}`;

    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(()=>category)
    );
  }


  delete(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(()=> null)
    );
  }

  private jsonDataCategory(jsonData: any): Category {

    return jsonData as Category;
  }

  private jsonDataCategories(jsonData: any): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));

    return categories;
  }

  private handleError(error: any): Observable<any> {
    console.log("erro na requisição => ", error);

    return throwError(error);
  }
}
