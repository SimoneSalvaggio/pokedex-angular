import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PokemonService } from "./services/pokemon.service";
import { Pokemon } from "./model/pokemon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "pokedex-angular";

  selectedPage: number;
  pokemonArray: Pokemon[];
  loadingList: boolean;
  offset: number;
  limit: number = 100;

  ngOnInit(): void {
    this.setPage(1);
  }

  constructor(
    private pokemonDetailsService: PokemonService,
    private pokemonListService: PokemonService
  ) {}

  // OTTENGO IL JSON DELLA LISTA DEI POKEMON DESIDERATI CON NOME E URL
  setPage(page) {
    this.loadingList = true;
    this.selectedPage = page;
    this.pokemonArray = [];
    this.offset = (this.selectedPage - 1) * 100;
    let resp = this.pokemonListService.getPokemonList(this.limit, this.offset);
    resp.subscribe((data) => this.getPokemonJson(data));
  }

  // OTTENGO I JSON DEI SINGOLI POKEMON DALLE URL CHE HO PRESO DAL JSON DELLA LISTA
  getPokemonJson(body: any) {
    let promises = [];
    for (let i: number = 0; i < this.limit; i++) {
      let resp = this.pokemonDetailsService.getPokemonDetails(
        body["results"][i]["url"]
      );
      let promise = new Promise((resolve) => {
        resp.subscribe((data) => this.getPokemonNameAndSprite(data, resolve));
      });
      promises.push(promise);
    }
    Promise.all(promises).then(() => {
      this.loadingList = false;
    });
  }

  // CREO IL POKEMON E LO PUSHO NELL'ARRAY
  getPokemonNameAndSprite(body: any, resolve: any) {
    let newPokemon = new Pokemon();

    let tempTypes = this.typesInString(body);
    let tempStats = this.statsInString(body);

    newPokemon.id = body["id"];
    newPokemon.name = body["name"];
    newPokemon.sprites = body["sprites"]["front_default"];
    newPokemon.types = tempTypes;
    newPokemon.stats = tempStats;
    this.pokemonArray.push(newPokemon);
    resolve("DONE");
  }
  //PROCEDIMENTO PER TRASFORMARE I RISULTATI MULTIPLI DI TYPES IN UNA SOLA STRINGA
  private typesInString(body: any) {
    let tempTypes = "";
    let typesName = body["types"];
    for (let index = 0; index < typesName.length; index++) {
      tempTypes += body["types"][index]["type"]["name"] + " ";
    }
    return tempTypes;
  }

  //PROCEDIMENTO PER TRASFORMARE I RISULTATI MULTIPLI DI STATS IN UNA SOLA STRINGA
  private statsInString(body: any) {
    let tempStats = "";
    let stats = body["stats"];
    for (let index = 0; index < stats.length; index++) {
      let nameOfStat = body["stats"][index]["stat"]["name"];
      let valueOfStat = body["stats"][index]["base_stat"];
      if (index == 0) {
        tempStats += nameOfStat + ": " + valueOfStat;
      } else {
        tempStats += " - " + nameOfStat + ": " + valueOfStat;
      }
    }
    return tempStats;
  }
}
