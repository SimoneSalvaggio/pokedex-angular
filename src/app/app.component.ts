import { Component, OnInit } from "@angular/core";
import { PokemonService } from "./services/pokemon.service";
import { Pokemon } from "./model/pokemon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "pokedex-angular";

  ngOnInit(): void {  }

  constructor() {}

}
