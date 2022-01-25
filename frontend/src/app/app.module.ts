import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { ChatroomService } from './chatroom/chatroom.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HeaderComponent } from './header/header.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
    declarations: [
    AppComponent,
    AuthorizationComponent,
    HeaderComponent,
    ChatroomComponent,
    PreloaderComponent,
    RegistrationComponent,
    ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ],
    providers: [
      PreloaderComponent,
      ChatroomService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
