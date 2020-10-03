import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public allNews: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.loadFavs();
   }

  async presentToast(message : string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }


  saveNews( news: Article ){

    const exist = this.allNews.find( data => data.title === news.title);
  
    if(!exist){
      this.allNews.unshift( news );
      this.storage.set('favs', this.allNews );
    }
    this.presentToast('Add to favorites');

  }

  deleteNews( news: Article){

    this.allNews = this.allNews.filter( data => data.title !== news.title )
    this.storage.set('favs', this.allNews );
  }

  async loadFavs(){

    const favs = await this.storage.get('favs');

    if(favs){
      this.allNews = favs;
    }
  }
}
