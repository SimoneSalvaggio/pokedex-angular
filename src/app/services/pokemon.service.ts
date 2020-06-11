import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    if (offset == undefined || offset == null) {
      offset = 0;
    }
    let resp = this.http.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + limit + "&offset=" + offset
    );
    return resp;
  }

  getPokemonDetails(url: string): Observable<any> {
    let resp = this.http.get(url);
    return resp;
  }

  getPokemonTypes(){
    let resp = this.http.get('https://pokeapi.co/api/v2/type/');
    return resp;
  }

  getPokemonTypeDetail(type){
    let resp = this.http.get('https://pokeapi.co/api/v2/type/'+type);
    return resp;
  }

}
