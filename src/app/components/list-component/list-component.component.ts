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
  
  @Input() loadingList: boolean;
  @Input() pokemonArray: Pokemon[];

  constructor(private pokemonDetailsService: PokemonDetailsService, private pokemonListService: PokemonListService) { }
  
  ngOnInit(): void { }

}
