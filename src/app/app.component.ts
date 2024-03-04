import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions : Array<any> = [
    {title:"Accueil",route:"/accueil" },
    {title:"Liste Des Produits",route: "/produits"},
    {title:"Ajout Produit",route: "/ajouterProduit"}
  ]

  actionCourante : any;
  setActionCourante(a : any){
    this.actionCourante=a;
  }
}
