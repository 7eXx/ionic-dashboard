import {Observable} from "rxjs";
import {NoteModel} from "../dashboard/datastructure.model";
import {Injectable} from "@angular/core";

export interface Note {
  _id: string;
  title: string;
  description: string;
  color: string;
  creationDatetime: string;
  owner: string;
}

@Injectable()
export abstract class NotesService {

  abstract getNotes(): Observable<Array<Note>>;

  abstract createNewNote(note: NoteModel): Observable<Note>;

  abstract deleteNote(noteId: string): Observable<any>;

  abstract updateNote(noteId: string, note: NoteModel): Observable<Note>;
}

