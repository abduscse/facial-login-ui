import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterializeModule } from './app-materialize.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraSnapshotComponent } from './camera-snapshot/camera-snapshot.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    RegisterComponent,
    CameraSnapshotComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterializeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
