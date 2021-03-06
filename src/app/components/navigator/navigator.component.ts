import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { PokemonService } from "src/app/services/pokemon.service";

@Component({
  selector: "app-navigator",
  templateUrl: "./navigator.component.html",
  styleUrls: ["./navigator.component.css"],
})
export class NavigatorComponent implements OnInit {
  pagesToGenerate: number;
  loading: boolean;
  pagesArray = [];
  typesArray = []

  @Input() selectedPage: number;
  @Output() pageEmitter = new EventEmitter<number>();

  constructor(private pokemonListService: PokemonService) {}

  ngOnInit(): void {
    this.loading = true;
    let resp = this.pokemonListService.getPokemonList(100, 0);
    resp.subscribe((data) => this.getPokemonCountResponse(data));
  }

  // PER CONTARE I RISULTATI E GENERARE IL GIUSTO NUMERO DI PAGINE
  getPokemonCountResponse(body: any) {
    let numberOfPokemon = body["count"];
    this.pagesToGenerate = Math.floor(numberOfPokemon / 100 + 1);
    for (let i = 0; i < this.pagesToGenerate; i++) {
      this.pagesArray.push(i + 1);
    }
    this.loading = false;
  }

  // 3 METODI PER IMPOSTARE LA PAGINA SELEZIONATA
  selectPage(page) {
    this.pageEmitter.emit(page);
  }

  nextPage() {
    if (this.selectedPage != 10) {
      this.selectedPage++;
      this.pageEmitter.emit(this.selectedPage);
    }
  }

  prevPage() {
    if (this.selectedPage != 1) {
      this.selectedPage--;
      this.pageEmitter.emit(this.selectedPage);
    }
  }
}