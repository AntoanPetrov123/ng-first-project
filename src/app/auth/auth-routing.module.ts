import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { HomePageComponent } from "../feature/pages/home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";



const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
    },
    {
        path: 'home',
        component: HomePageComponent
    },
]

export const AuthRoutingModule = RouterModule.forChild(routes);
