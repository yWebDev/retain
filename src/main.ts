import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app';
import { Main, NotesContainer, About, Auth } from './app/containers';
import { AppBarComponent, NoteCard, NoteCreator, ColorPicker } from './app/ui';
import { providers } from './app';
import { routes } from './app/routes';

@NgModule({
    declarations: [
        AppComponent,
        Main,
        AppBarComponent,
        NotesContainer,
        NoteCard,
        NoteCreator,
        ColorPicker,
        About,
        Auth
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes
    ],
    providers,
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
