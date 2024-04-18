import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CoinComponent } from './pages/coin/coin.component';
import { ReviewPublicationComponent } from './pages/review-publication/review-publication.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';
import { UserPublicationComponent } from './pages/user-publication/user-publication.component';
import { ReportPublicationComponent } from './pages/report-publication/report-publication.component';
import { InformationComponent } from './pages/information/information.component';
import { RecomendationComponent } from './pages/recomendation/recomendation.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SelectChatComponent } from './pages/select-chat/select-chat.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'coin',component:CoinComponent},
  {path:'review_publication',component:ReviewPublicationComponent},
  {path:'publication',component:PublicationComponent},
  {path:'add_publication',component:AddPublicationComponent},
  {path:'user_publication',component:UserPublicationComponent},
  {path:'report_publication',component:ReportPublicationComponent},
  {path:'information',component:InformationComponent},
  {path:'profile',component:RecomendationComponent},
  {path:'chat',component:ChatComponent},
  {path:'view_chat',component:SelectChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
