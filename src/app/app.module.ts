import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NavigatorComponent } from "./components/navigator/navigator.component";
import { CardComponent } from "./components/card/card.component";
import { ModalComponent } from "./components/modal/modal.component";

import { PokemonService } from "./services/pokemon.service";
import { MainComponent } from './components/main/main.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TypesComponent } from './components/types/types.component';
import { HomeComponent } from './components/home/home.component';
import { TypecardComponent } from './components/typecard/typecard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'types',
    component: TypesComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavigatorComponent,
    CardComponent,
    ModalComponent,
    MainComponent,
    SidebarComponent,
    TypesComponent,
    HomeComponent,
    TypecardComponent
  ],
  imports: [BrowserModule, CommonModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
