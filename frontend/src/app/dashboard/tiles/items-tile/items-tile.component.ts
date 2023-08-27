import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-tile',
  templateUrl: './items-tile.component.html',
  styleUrls: ['./items-tile.component.scss'],
})
export class ItemsTileComponent  implements OnInit {

  title = 'Items';

  constructor() { }

  ngOnInit() {}

}
