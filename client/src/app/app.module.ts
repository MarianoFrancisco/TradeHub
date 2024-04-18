import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoinComponent } from './pages/coin/coin.component';
import { ReviewPublicationComponent } from './pages/review-publication/review-publication.component';
import { RegisterComponent } from './auth/register/register.component';
import { PublicationComponent } from './pages/publication/publication.component';
import { AddPublicationComponent } from './pages/add-publication/add-publication.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { UserPublicationComponent } from './pages/user-publication/user-publication.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { InformationComponent } from './pages/information/information.component';
import { RecomendationComponent } from './pages/recomendation/recomendation.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SelectChatComponent } from './pages/select-chat/select-chat.component';
import { ReportPublicationComponent } from './pages/report-publication/report-publication.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    CoinComponent,
    ReviewPublicationComponent,
    RegisterComponent,
    PublicationComponent,
    AddPublicationComponent,
    PaymentComponent,
    UserPublicationComponent,
    EditUserComponent,
    InformationComponent,
    RecomendationComponent,
    ChatComponent,
    SelectChatComponent,
    ReportPublicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
