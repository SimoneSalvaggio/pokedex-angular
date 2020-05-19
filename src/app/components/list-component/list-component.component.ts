import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonListService } from 'src/app/services/pokemon-list.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  limit: number = 100;
  offset: number;
  loadingList: boolean;
  pokemon: Pokemon;
  pokemonArray = [];
  urlArray = [];

  @Input() selectedPage: number;

  @Output() arrayEmitter = new EventEmitter<Pokemon>();

  constructor(private pokemonDetailsService: PokemonDetailsService, private pokemonListService: PokemonListService) { }
  
  ngOnInit(): void {
    this.loadingList = true;
    this.pokemonArray = [];
    this.offset = (this.selectedPage-1)*100;
    console.log(this.offset)
    let resp = this.pokemonListService.getPokemonList(this.limit, this.offset);
    resp.subscribe((data) => this.getPokemonUrl(data))
  }

  getPokemonUrl(body: any) {
    for (let i:number = 0; i < this.limit; i++) {
      this.urlArray.push(body["results"][i]["url"])
    }
    this.getPokemonJson();
  }

  getPokemonJson() {
    for (let i:number = 0; i < this.urlArray.length; i++) {
      let resp = this.pokemonDetailsService.getPokemonDetails(this.urlArray[i]);
      resp.subscribe((data) => this.getPokemonNameAndSprite(data)
      )
    }
    this.loadingList = false;
  }

  getPokemonNameAndSprite(body: any) {
    let newPokemon = new Pokemon();

    let tempTypes = "";
    let typesName = body["types"];
    for (let index = 0; index < typesName.length; index++) {
      tempTypes += body["types"][index]["type"]["name"] + " ";
    }

    let tempStats = "";
    let stats = body["stats"];
    for (let index = 0; index < stats.length; index++) {
      tempStats += " - " + body["stats"][index]["stat"]["name"] + ": " + body["stats"][index]["base_stat"];
    }

    newPokemon.id = body["id"];
    newPokemon.name = body["name"];
    newPokemon.sprites = body["sprites"]["front_default"];
    newPokemon.types = tempTypes;
    newPokemon.stats = tempStats;
    this.pokemonArray.push(newPokemon);
    
  }

}
