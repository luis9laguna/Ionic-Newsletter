import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public news: Article[] = [];

  constructor( private newService: NewsService) {}


  ngOnInit() {
    this.loadCategory();
  }

  loadData(event){
    this.loadCategory( event );
  }

  loadCategory( event? ){
    this.newService.getTopHeadLines().subscribe(
      res => {

        if( res.articles.length == 0 ){
          event.target.disabled = true;
          return;
        }
        this.news.push( ...res.articles);
      });
      if(event){
        event.target.complete();
      }
  }

}
