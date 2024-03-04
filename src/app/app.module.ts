import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

const routes : Routes = [
  {path : "accueil"  , component:AccueilComponent},
  {path : "produits" , component:ProduitsComponent},
  {path : "ajouterProduit"  , component:AjoutProduitComponent}
];
@NgModule({
  declarations: [AppComponent,AccueilComponent
    ,ProduitsComponent,AjoutProduitComponent],
    imports: [HttpClientModule,NgFor, FormsModule,BrowserModule,RouterModule.forRoot(routes),],
    providers: [],
    bootstrap: [AppComponent]
    })



export class AppModule { }
