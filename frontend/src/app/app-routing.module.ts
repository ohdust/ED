import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/chat', pathMatch: 'full'},
    {path: 'login', component: AuthorizationComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'chat', component: ChatroomComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: "/chat"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
