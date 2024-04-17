import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import * as store from './reducers';
 


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(store.reducers,{
      metaReducers:store.metaReducers,
      runtimeChecks:{
        strictStateImmutability:true,
        strictActionImmutability:true,
        strictActionSerializability:true,
        strictStateSerializability:true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey:'router',
      routerState: RouterState.Minimal
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
