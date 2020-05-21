import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PokemonListService } from 'src/app/services/pokemon-list.service';

@Component({
  selector: 'app-navigator-component',
  templateUrl: './navigator-component.component.html',
  styleUrls: ['./navigator-component.component.css']
})
export class NavigatorComponentComponent implements OnInit {
  
  pagesToGenerate: number;
  loading: boolean;
  pagesArray = [];

  @Input() selectedPage: number;
  @Output() pageEmitter = new EventEmitter<number>();

  constructor(private pokemonListService: PokemonListService) { }

  ngOnInit(): void {
    this.loading= true;
    let resp = this.pokemonListService.getPokemonList(100, 0);
    resp.subscribe((data) => this.getPokemonCountResponse(data)
    )
  }
  
  // PER CONTARE I RISULTATI E GENERARE IL GIUSTO NUMERO DI PAGINE
  getPokemonCountResponse(body: any) {
    let numberOfPokemon = body["count"]
    this.pagesToGenerate = Math.floor(numberOfPokemon / 100 + 1)
    for (let i = 0; i < this.pagesToGenerate; i++) {
      this.pagesArray.push(i + 1)
    }
    this.loading = false;
  }

  // 3 METODI PER IMPOSTARE LA PAGINA SELEZIONATA
  selectPage(page){
    this.pageEmitter.emit(page);
  }

  nextPage(){
    if (this.selectedPage!=10) {
      this.selectedPage++;
      this.pageEmitter.emit(this.selectedPage);
    }
  }

  prevPage(){
    if (this.selectedPage!=1) {
      this.selectedPage--;
      this.pageEmitter.emit(this.selectedPage);
    }
  }

}
