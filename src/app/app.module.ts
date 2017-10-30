import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemService } from './services/item.service';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthService } from './services/auth.service';
import { ProfilComponent } from './profil/profil.component';
import { ProfilService } from './services/profil.service';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'items/:id', component: ItemDetailsComponent},
  { path: 'login', component: AuthentificationComponent},
  { path: 'profil', component: ProfilComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    ItemDetailsComponent,
    AuthentificationComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ItemService,
    AuthService,
    ProfilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
