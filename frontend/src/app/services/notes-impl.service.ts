import {Observable, of} from "rxjs";
import {Note, NotesService} from "./notes.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NoteModel} from "../dashboard/datastructure.model";
import {Injectable} from "@angular/core";

@Injectable()
export class NotesImplService extends NotesService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public override getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>(environment.url + '/notes', {
      withCredentials: true
    });
  }

  public override createNewNote(note: NoteModel): Observable<Note> {
    return this.httpClient.post<Note>(
      environment.url + '/notes',
      note, {withCredentials: true }
    )
  }

  public override deleteNote(noteId: string): Observable<any> {
    return this.httpClient.delete<any>(
      environment.url + '/notes',
      {
        body: {id: noteId},
        withCredentials: true
      }
    );
  }

  public override updateNote(noteId: string, note: NoteModel): Observable<Note> {
    const payload = Object.assign({ id: noteId }, note);
    return this.httpClient.put<Note>(
        environment.url + '/notes',
        payload,
        {
          withCredentials: true
        }
    )
  }
}
