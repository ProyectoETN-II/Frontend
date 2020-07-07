import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';


// Componentes
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component'; 

// Servicios
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
  ],
  providers: [
    appRoutingProviders,
    UserService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
