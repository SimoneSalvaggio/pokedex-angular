import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

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
  pokemonUrlArray: string[];

  ngOnInit(): void {
    this.setPage(1);
  }

  constructor(
    private pokemonService: PokemonService
  ) { }

  // OTTENGO IL JSON DELLA LISTA DELLE URL DEI POKEMON E LI METTO NELL'ARRAY
  setPage(page) {
    this.pokemonUrlArray = [];
    this.loadingList = true;
    this.selectedPage = page;
    this.offset = (this.selectedPage - 1) * 100;
    let resp = this.pokemonService.getPokemonList(this.limit, this.offset);
    resp.subscribe((data) => {
      for (let i of data["results"]) {
        let newPokemonurl = i["url"];
        this.pokemonUrlArray.push(newPokemonurl)
      }
      this.loadingList = false;
    });
  }
}