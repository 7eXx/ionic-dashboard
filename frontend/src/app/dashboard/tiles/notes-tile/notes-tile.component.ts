import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-tile',
  templateUrl: './notes-tile.component.html',
  styleUrls: ['./notes-tile.component.scss'],
})
export class NotesTileComponent  implements OnInit {

  title = 'Notes';

  constructor() { }

  ngOnInit() {}

}
