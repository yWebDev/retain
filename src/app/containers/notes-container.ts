import {Component} from '@angular/core';

import {NotesService} from '../services';
import {Store} from '../store';

@Component({
    selector: 'notes-container',
    styles: [`
    .notes {
      padding-top: 50px;
    }
    .creator {
      margin-bottom: 40px; 
    }
    `],
    template: `
        <div class="row center-xs notes">
          <div class="col-xs-6 creator">
            <note-creator (created)="onNoteCreated($event)" ></note-creator>
          </div>
          <div class="notes col-xs-8">
            <div class="row between-xs">
              <note-card
                class="col-xs-4"
                [note]="note"
                *ngFor="let note of notes;"
                (checked)="onNoteChecked($event)"
              >
              </note-card>
            </div>
          </div>
        </div>
    `
})
export class NotesContainer {
    notes = [];

    constructor(
        private notesService: NotesService,
        private store: Store
    ) {
        this.notesService.getNotes()
            .subscribe();

        this.store.changes
            .map(data => data.notes)
            .subscribe(notes => this.notes = notes);
    }

    onNoteChecked(note) {
        this.notesService.completeNote(note)
            .subscribe();
    }

    onNoteCreated(note) {
        this.notesService.createNote(note)
            .subscribe();
    }
}