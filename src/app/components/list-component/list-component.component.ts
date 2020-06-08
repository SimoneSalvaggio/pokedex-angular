import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Pokemon } from "src/app/model/pokemon";

@Component({
  selector: "app-list-component",
  templateUrl: "./list-component.component.html",
  styleUrls: ["./list-component.component.css"],
})
export class ListComponentComponent implements OnInit {
  @Input() loadingList: boolean;
  @Input() pokemonArray: Pokemon[];

  constructor() {}

  ngOnInit(): void {}
}
