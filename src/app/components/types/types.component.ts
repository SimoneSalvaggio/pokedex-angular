import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  typesArray = [];
  pokemonUrlArrayByType: string[];
  loadingTypeList: boolean;
  typeToSearch: string;
  maxOfPokemon: number;

  constructor(private typeService: TypeService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    let resp = this.pokemonService.getPokemonList(100, 0);
    resp.subscribe((data) => this.getPokemonCount(data));

    let resps = this.typeService.getPokemonTypes();
    resps.subscribe((data) => this.generateTypesList(data))
  }

  //OTTENGO IL JSON DELLA LISTA DELLE URL DESIDERATE DEI POKEMON E LI METTO NELL'ARRAY
  getPokemonUrlByType(type){
    this.pokemonUrlArrayByType = [];
    this.loadingTypeList = true;
    let resp = this.typeService.getPokemonTypeDetail(type.toLowerCase());
    resp.subscribe((data) => {
      for (let i of data["pokemon"]) {
        let newPokemonurl = i["pokemon"]["url"];
        this.pokemonUrlArrayByType.push(newPokemonurl)
      }
      this.loadingTypeList = false;
    });
  }
  
  getPokemonCount(body: any) {
    this.maxOfPokemon = body["count"];
  }

  generateTypesList(body) {
    for (let i of body["results"]) {
      let newType = i["name"];
      this.typesArray.push(newType.toUpperCase());
    }
  }
}