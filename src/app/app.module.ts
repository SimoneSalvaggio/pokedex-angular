import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponentComponent } from './components/navbar-component/navbar-component.component';
import { NavigatorComponentComponent } from './components/navigator-component/navigator-component.component';
import { ListComponentComponent } from './components/list-component/list-component.component';
import { CardComponentComponent } from './components/card-component/card-component.component';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';

import { PokemonListService } from './services/pokemon-list.service';
import { PokemonDetailsService } from './services/pokemon-details.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponentComponent,
    NavigatorComponentComponent,
    ListComponentComponent,
    CardComponentComponent,
    ModalComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    PokemonListService,
    PokemonDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
