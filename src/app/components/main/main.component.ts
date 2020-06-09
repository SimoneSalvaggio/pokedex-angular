import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonBase } from 'src/app/model/pokemonBase';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedPage: number;
  loadingList: boolean;
  offset: number;
  limit: number = 100;
  pokemonBaseArray: PokemonBase[];
  newPokemon: PokemonBase;

  ngOnInit(): void {
    this.setPage(1);
  }

  constructor(
    private pokemonService: PokemonService
  ) { }

  // OTTENGO IL JSON DELLA LISTA DEI POKEMON DESIDERATI CON NOME E URL E CREO UN ARRAY DI OGGETTI POKEMONBASE (CON NOME E URL)
  setPage(page) {
    this.pokemonBaseArray = [];
    this.loadingList = true;
    // if (page == 10) {
    //   this.loadingList = false;
    // }
    this.selectedPage = page;
    this.offset = (this.selectedPage - 1) * 100;
    let resp = this.pokemonService.getPokemonList(this.limit, this.offset);
    resp.subscribe((data) => {
      for (let i = 0; i < this.limit; i++) {
        this.newPokemon = new PokemonBase();

        this.newPokemon.name = data["results"][i]["name"].toUpperCase();
        this.newPokemon.url = data["results"][i]["url"];
        
        if (data != undefined) {
          this.pokemonBaseArray.push(this.newPokemon)
        }
      }
      this.loadingList = false;
    });
  }
}
