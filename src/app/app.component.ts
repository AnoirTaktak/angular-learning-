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

  getIconClass(action: any): string {
    // Assuming you have some logic to determine which icon class to use based on the action
    // Replace the logic below with your own
    if (action.title === 'Accueil') {
      return 'bi bi-house'; // Example Bootstrap icon class for Action1
    } else if (action.title === 'Liste Des Produits') {
      return 'bi bi-card-list'; // Example Bootstrap icon class for Action2
    } else if (action.title === 'Ajout Produit') {
      return 'bi bi-file-earmark-plus-fill'; // Example Bootstrap icon class for Action3
    } else {
      return ''; // Default icon class
    }
  }
}
