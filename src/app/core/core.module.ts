import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ToastrModule } from 'ngx-toastr'; 
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once-guard';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from './modal/modal.module';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    HttpClientModule, 
    NgProgressModule, 
    NgProgressRouterModule, 
    NgProgressHttpModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'bs', separator: '-' }),
    SharedModule, 
    ModalModule
  ],
  exports: [NavbarComponent, FooterComponent, 
    RouterModule, 
    HttpClientModule, 
    NgProgressModule, 
    NgProgressRouterModule, 
    NgProgressHttpModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgxWebstorageModule,
    ModalModule
  ],
  declarations: [NavbarComponent, FooterComponent]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard  { // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    super(parentModule);
  }
}
