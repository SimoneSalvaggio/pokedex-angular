import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TypeService {
  constructor(private http: HttpClient) {}

  getPokemonTypes(): Observable<any> {
    let resp = this.http.get('https://pokeapi.co/api/v2/type/');
    return resp;
  }

  getPokemonTypeDetail(type): Observable<any> {
    let resp = this.http.get('https://pokeapi.co/api/v2/type/'+type);
    return resp;
  }
}
