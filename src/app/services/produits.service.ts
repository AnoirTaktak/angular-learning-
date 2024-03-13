import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../model/protuit';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  // Url du service web de gestion de produits
  // commune pour toutes les méthodes

  urlHote="http://localhost:3333/produits/";
  urlHote1="http://localhost:3333/produits/";

  constructor(private http :HttpClient)
  {

  }

  getProduits() :Observable<Array<Produit>>
  {
    return this.http.get<Array<Produit>> (this.urlHote);
  }

  deleteProduit(idP: number|undefined)
  {
    return this.http.delete (this.urlHote+idP);
  }

  addProduit(nouveau: Produit)
  {
    return this.http.post<Array<Produit>> (this.urlHote,nouveau);
  }

  updateProduit(idP: number, nouveau: Produit)
  {
    return this.http.put(this.urlHote+idP,nouveau);
  }

  getCat() :Observable<Array<Categorie>>
  {
    return this.http.get<Array<Categorie>> (this.urlHote1);
  }
}


