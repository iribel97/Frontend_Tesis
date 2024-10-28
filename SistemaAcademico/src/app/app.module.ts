import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // otros componentes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent
  ],
  providers: [
    provideHttpClient(withFetch()), // Configuración para usar fetch
  ],
  // bootstrap: [AppComponent]
})
export class AppModule {}
