import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RespTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public page = 0;
  public categoryActual = '';
  public categoryPage = 0;

  constructor( private http: HttpClient) { }

  private getQuery<T>( query: string ){

    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines(){

    this.page++;

    return this.getQuery<RespTopHeadLines>(`/top-headlines?country=us&page=${this.page}`);
  }

  getCategory( category: string ){

    if( this.categoryActual == category ){
      this.categoryPage++;
    }else{
      this.categoryPage = 1;
      this.categoryActual = category;
    }

    return this.getQuery<RespTopHeadLines>(`/top-headlines?country=de&category=${category}&page=${ this.categoryPage }`);
  }

}
