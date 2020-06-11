import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

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

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    let resp = this.pokemonService.getPokemonList(100, 0);
    resp.subscribe((data) => this.getPokemonCount(data));

    let resps = this.pokemonService.getPokemonTypes();
    resps.subscribe((data) => this.generateTypesList(data))
  }

  getPokemonUrlByType(type){
    this.pokemonUrlArrayByType = [];
    this.loadingTypeList = true;
    let resp = this.pokemonService.getPokemonTypeDetail(type.toLowerCase());
    resp.subscribe((data) => {
      for (let i of data["pokemon"]) {
        let newPokemonurl = i["pokemon"]["url"];
        this.pokemonUrlArrayByType.push(newPokemonurl)
        console.log(this.pokemonUrlArrayByType);
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

  // getPokemonByType(type){
  //   this.typeToSearch = type.toLowerCase();
  //   this.pokemonUrlArrayByType = [];
  //   this.loadingList = true;
  //   let resp = this.pokemonService.getPokemonList(this.maxOfPokemon, 0);
  //   //da mettere max of pokemon al posto del 30
  //   resp.subscribe((data) => {
  //     for (let i of data["results"]) {
  //       let newPokemonurl = i["url"];
  //       this.pokemonUrlArrayByType.push(newPokemonurl)
  //     }
  //     this.loadingList = false;
  //   });
  // }
}