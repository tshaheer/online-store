import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './account/account.module';

@NgModule({
  imports: [
    BrowserModule,
    AccountModule,    // Eager loaded since we may need to go here right away as browser loads based on route user enters
    AppRoutingModule, // Main routes for application
    CoreModule,       // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule      // Shared (multi-instance) objects
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
