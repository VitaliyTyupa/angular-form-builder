import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BuilderComponent } from './components/builder/builder.component';
import {FormioModule} from '@formio/angular';
import {HttpApiInterceptor} from './services/core-services/interceptors/http-api-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApiModule} from './services/core-services/api/api.module';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent
  ],
  imports: [
    BrowserModule,
    FormioModule,
    FormsModule,
    ApiModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
