import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {



  showForm: boolean = false;
  editedProduct: Produit = new Produit();
  produitCourant: Produit = new Produit();
  inputValue: string = '';

  produits: Array<Produit> = [
    {id:1,code:'x12',designation:"Panier plastique",prix:20},
    {id:2,code:'y4',designation:"table en bois",prix:100},
    {id:3,code:'y10',designation:"salon en cuir",prix:3000}
    ];

    index = this.produits.findIndex(p => p.id === this.produitCourant.id);
    p = new Produit();
    cat :Array<any> = [

    ];



    editLigne()
    {
      if (this.index !== -1) {
        this.produits[this.index] = { ...this.editedProduct };
        this.produitCourant = new Produit();
      }
    }





    resetInput() {
      this.produitCourant = {
        id: 0,
        code: '',
        designation: '',
        prix: 0
      };
      this.showForm=false;
    }


//.................................................................


  editProduct(produit : Produit){
      this.produitCourant = produit;
      this.showForm=true;
    }
    constructor(private produitsService :ProduitsService)
    {
    }

  ngOnInit(): void
  {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
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
    console.log(data);
    this.produits=data;
    this.cat=data;
    console.log(this.cat);

    },
    //En cas d'erreur
    error: err=> {
    console.log("Erreur GET");
    }
  }
)

}

effacerProduit(p:Produit,n:number){
  console.log("suppresion de produit N° : "+p.id);
  this.produitsService.deleteProduit(p.id).subscribe(
    {
      //En cas de succès
    next: data=> {
      console.log("Succès De suppression");
      this.produits.splice(n, 1);
      },
      //En cas d'erreur
      error: err=> {
      console.log("Erreur de Suppression");
      }
    }
  )
}

editerProduit(form: NgForm) {
  console.log(form.value);
  const productId = form.value.id;

  if (productId !== undefined) {
    // Use non-null assertion operator (!) to indicate that productId is not undefined
    this.produitsService.updateProduit(productId, form.value).subscribe(
      {
        next: data => {
          console.log("Mise à jour affectée du produit : " + form.value.designation);
        },
        error: err => {
          console.log("Erreur de mise à jour :", err);
        }
      }
    );
  } else {
    console.error("Product ID is undefined");
  }
}



/*validerFormulaire(form: NgForm)
{
  console.log(form.value);
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined)
    {
      console.log("id non vide...");
      //flag pour distinguer entre le mode AJOUT et le mode EDIT
      let nouveau:boolean=true;
      let index=0;
      do{
        let p=this.produits[index];
        console.log(
        p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id==form.value.id)
          {
          //rendre le mode à EDIT
          nouveau=false;
          console.log('ancien');
          let reponse:boolean =
          confirm("Produit existant. Confirmez vous la mise à jour de :"+p.designation+" ?");
          if (reponse==true)
          {
          //mettre à jour dans le BackEnd
            this.http.put<Array<Produit>> ("http://localhost:9999/produits/"+
            form.value.id, form.value)
              .subscribe(
                  {
                   next: updatedProduit=> {
                      console.log("Succès PUT");
                      //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
                      p.code=form.value.code;
                      p.designation=form.value.designation;
                      p.prix=form.value.prix;
                      console.log('Mise à jour du produit:'
                      +p.designation);
                    },
                  error: err=> {
                    console.log("Erreur PUT");
                  }
              }
            )
          }
          else
          {
            console.log("Mise à jour annulée");
          }
          //Arrêter la boucle
          return;
        }
        else{
        //continuer à boucler
        index++;
        }
      }
      while(nouveau && index<this.produits.length);
      //en cas d'ajout
        if (nouveau)
        {
          console.log('nouveau');
          this.http.post("http://localhost:9999/produits/", form.value)
          .subscribe(
      (response) => {
        console.log("Response from server:", response);
        this.produits.push(form.value);
        console.log("Ajout d'un nouveau produit:" + form.value.designation);
      },
      (error) => {
        console.error("Error adding product:", error);
      }
    );
          this.produits.push(form.value);
          console.log("Ajout d'un nouveau produit:"+form.value.designation);
        }
}
else
{
console.log("id vide...");
}
}*/


/*deleteProduct(p:Produit) {

      let reponse:boolean =confirm("Voulez vous supprimer le produit :"+p.designation+" ?");
      if (reponse==true)
      {
        console.log("Suppression confirmée..." );
        let index: number = this.produits.indexOf(p);
        console.log("indice du produit à supprimer: "+index);
        if (index !== -1)
        {
          this.produits.splice(index, 1);
          // Send HTTP DELETE request to the server
          this.http.delete(`http://localhost:9999/produits/${index}`)
          .subscribe(
              (response) => {
              console.log("Product deleted successfully:", response);
              // If the deletion was successful, remove the product from the local list
              this.produits = this.produits.filter(product => product.id !== index);
            },
            (error) => {
                console.error("Error deleting product:", error);
              }
          );
        }
        }
        else
        {
        console.log("Suppression annulée..." );
        }
    }*/


}
