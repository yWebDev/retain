import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'note-creator',
    styles: [`
        .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
    `],
    template: `
    <div
     class="note-creator shadow-2"
     [ngStyle]="{backgroundColor: newNote.color}"
     >
      <form
       class="row"
       (submit)="onCreated()"
       >
        <input
          type="text"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          [(ngModel)]="newNote.value"
          (focus)="toggle(true)"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div
         class="actions col-xs-12 row between-xs"
         *ngIf="fullForm"
         >
          <div class="col-xs-3">
            <color-picker
             [colors]="colors"
             (selected)="onColorSelected($event)"
             ></color-picker>
          </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>
    `
})
export class NoteCreator {
    @Output() created = new EventEmitter();

    newNote = {
        title: '',
        value: '',
        color: 'white'
    };
    fullForm: boolean = false;
    colors: string[] = ['#b19cd9', '#ff9691', '#77dd77', '#aec6cf', '#f49ac2', 'white'];

    onCreated() {
        const {title, value} = this.newNote;

        if (title && value) {
            this.created.next(this.newNote);
        }

        this.reset();
        this.toggle(false);
    }

    reset() {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
    }

    toggle(value: boolean): void {
        this.fullForm = value;
    }

    onColorSelected(color) {
        this.newNote.color = color;
    }
}
