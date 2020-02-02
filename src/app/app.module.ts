import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
import {ProfileComponent, ReadmeComponent, SearchComponent} from './components' ;
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {GithubService} from './services/github.services';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ReadmeComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [GithubService, MarkdownService, MarkedOptions],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
