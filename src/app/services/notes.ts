import {Injectable} from '@angular/core';

import {ApiService} from './api'
import {StoreHelper} from './store-helper'

@Injectable()
export class NotesService {
    constructor(
        private api: ApiService,
        private storeHelper: StoreHelper,
    ) {}

    private path: string = '/notes';

    getNotes() {
        return this.api.get(this.path)
            .do(resp => { this.storeHelper.update('notes', resp.data) });
    }

    createNote(note) {
        return this.api.post(`${this.path}`, note)
            .do(savedNote => { this.storeHelper.add('notes', savedNote) });
    }

    completeNote(note) {
        return this.api.delete(`${this.path}/${note.id}`)
            .do(() => { this.storeHelper.findAndDelete('notes', note.id) });
    }
}