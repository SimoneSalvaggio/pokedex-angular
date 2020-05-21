import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  @Input() pokemonArray: Pokemon[];
  
  pokemonName: string;
  pokemonSprite: string;
  pokemonId: number;
  pokemonStats: string;
  pokemonTypes: string;

  constructor() { }

  ngOnInit(): void { }

  // AVEVO PROVATO A PASSARLO COME POKEMON MA NON STAMPAVA I DATI QUINDI LI HO PASSATI SINGOLARMENTE
  getModalDetails(name, id, sprite, types, stats) {
    this.pokemonName = name;
    this.pokemonId = id;
    this.pokemonSprite = sprite;
    this.pokemonTypes = types;
    this.pokemonStats = stats;
  }

}
