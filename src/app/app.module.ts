import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NavigatorComponent } from "./components/navigator/navigator.component";
import { CardComponent } from "./components/card/card.component";
import { ModalComponent } from "./components/modal/modal.component";

import { PokemonService } from "./services/pokemon.service";
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavigatorComponent,
    CardComponent,
    ModalComponent,
    MainComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
