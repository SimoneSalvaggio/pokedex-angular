import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  @Input() pokemonName: string;
  @Input() pokemonId: number;
  @Input() pokemonSprite: string;
  @Input() pokemonStats: string;
  @Input() pokemonTypes: string;

  constructor() { }

  ngOnInit(): void { }

}