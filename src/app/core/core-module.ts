import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import { Header } from './component/header/header';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [httpInterceptorProviders]
})
export class CoreModule { }
