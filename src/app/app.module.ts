import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BuilderComponent } from './components/builder/builder.component';
import {FormioModule} from '@formio/angular';
import {HttpApiInterceptor} from './services/core-services/interceptors/http-api-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent
  ],
  imports: [
    BrowserModule,
    FormioModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
