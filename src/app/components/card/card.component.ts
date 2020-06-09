import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() pokemonUrl: string;

  loadingCard: boolean;
  pokemonToShow: Pokemon;


  constructor(
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadingCard = true;
    this.pokemonToShow = new Pokemon;

    let resp = this.pokemonService.getPokemonDetails(this.pokemonUrl)
    resp.subscribe((data) => {
      let tempTypes = this.typesInString(data);
      let tempStats = this.statsInString(data);

      this.pokemonToShow.id = data["id"];
      this.pokemonToShow.name = data["name"];
      this.pokemonToShow.sprites = data["sprites"]["front_default"];
      this.pokemonToShow.types = tempTypes;
      this.pokemonToShow.stats = tempStats;
    })
    this.loadingCard = false;
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