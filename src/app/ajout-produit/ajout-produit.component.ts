import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/protuit';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit{

  constructor(private produitsService :ProduitsService)
  {

  }

  produits: Array<Produit> = [];
  nouveauProduit = new Produit();

  ngOnInit(): void
  {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();

  }

  validerFormulaire(): void {
    // Vérifier si un produit avec le même ID existe déjà dans la liste de produits
    const produitExistant = this.produits.find(produit => produit.id === this.nouveauProduit.id);
    if (produitExistant) {
      alert("Identificateur de produit déjà existant.");
    } else {
      this.ajouterProduit();
    }
  }


  consulterProduits()
  {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
    .subscribe(
  {
    //En cas de succès
    next: data=> {
    console.log("Succès GET");
    this.produits=data;
    },
    //En cas d'erreur
    error: err=> {
    console.log("Erreur GET");
    }
  }
)
}


ajouterProduit(): void {
  this.produitsService.addProduit(this.nouveauProduit).subscribe(() => {
    // Réinitialiser le contenu du formulaire pour préparer une nouvelle insertion
    this.nouveauProduit = new Produit();
  });
}

}
