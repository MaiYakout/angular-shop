import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './components/elements/topbar/topbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SplashScreenComponent } from './components/pages/splash-screen/splash-screen.component';
import { SliderHomeComponent } from './components/elements/slider-home/slider-home.component';
import { AboutMunaqesComponent } from './components/elements/about-munaqes/about-munaqes.component';
import { VideoComponent } from './components/elements/video/video.component';
import { BidsComponent } from './components/elements/bids/bids.component';
import { FooterComponent } from './components/elements/footer/footer.component';
import { StatisticsComponent } from './components/elements/statistics/statistics.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { CompleteResetPasswordComponent } from './components/pages/complete-reset-password/complete-reset-password.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RegisterBuyerComponent } from './components/pages/register-buyer/register-buyer.component';
import { RegisterSellerComponent } from './components/pages/register-seller/register-seller.component';
import { VerificationComponent } from './components/pages/verification/verification.component';
import { CompleteProfileComponent } from './components/pages/complete-profile/complete-profile.component';
import { MyBidsComponent } from './components/pages/my-bids/my-bids.component';
import { TobbarBidsComponent } from './components/elements/tobbar-bids/tobbar-bids.component';
import { CreateBidsComponent } from './components/pages/create-bids/create-bids.component';
import { BidDetailsComponent } from './components/pages/bid-details/bid-details.component';
import { MessageComponent } from './components/pages/message/message.component';
import { NotificationComponent } from './components/pages/notification/notification.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RequestComponent } from './components/pages/request/request.component';
import { TobbarsellerComponent } from './components/elements/tobbarseller/tobbarseller.component';
import { AvilableBidsComponent } from './components/pages/avilable-bids/avilable-bids.component';
import { AppliedBidsComponent } from './components/pages/applied-bids/applied-bids.component';
import { AppliedformComponent } from './components/pages/appliedform/appliedform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {CallBack} from "./callback_services/callback";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingPageComponent } from './components/elements/loading-page/loading-page.component';
// import { TagInputModule } from 'ngx-chips';
import {MaterialExampleModule} from './material.module';
import { EditBidComponent } from './components/pages/edit-bid/edit-bid.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { AuthInterceptor } from './services/interceptor';
import { SellerDetailsComponent } from './components/pages/seller-details/seller-details.component';
import { CreateBidSellerComponent } from './components/pages/create-bid-seller/create-bid-seller.component';
import { EditBidSellerComponent } from './components/pages/edit-bid-seller/edit-bid-seller.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { ChatComponent } from './components/pages/chat/chat.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireDatabaseModule, USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

import { environment } from 'src/environments/environment.prod';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ClickOutsideModule } from 'ng-click-outside';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { CompleteSellerComponent } from './components/pages/complete-seller/complete-seller.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

//social login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { SocialLoginComponent } from './components/pages/social-login/social-login.component';
import { ComingsoonComponent } from './components/pages/comingsoon/comingsoon.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomeComponent,
    SplashScreenComponent,
    SliderHomeComponent,
    AboutMunaqesComponent,
    VideoComponent,
    BidsComponent,
    FooterComponent,
    StatisticsComponent,
    LoginComponent,
    ResetPasswordComponent,
    CompleteResetPasswordComponent,
    RegisterComponent,
    RegisterBuyerComponent,
    RegisterSellerComponent,
    VerificationComponent,
    CompleteProfileComponent,
    MyBidsComponent,
    TobbarBidsComponent,
    CreateBidsComponent,
    BidDetailsComponent,
    MessageComponent,
    NotificationComponent,
    ProfileComponent,
    RequestComponent,
    TobbarsellerComponent,
    AvilableBidsComponent,
    AppliedBidsComponent,
    AppliedformComponent,
    LoadingPageComponent,
    EditBidComponent,
    PaymentComponent,
    SellerDetailsComponent,
    CreateBidSellerComponent,
    EditBidSellerComponent,
    ChatComponent,
    PrivacyComponent,
    TermsComponent,
    CompleteSellerComponent,
    SocialLoginComponent,
    ComingsoonComponent,
    
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule ,
    HttpClientModule,
    ReactiveFormsModule ,
    ClickOutsideModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    MatDialogModule,
    ModalModule,
    MatCarouselModule.forRoot(),
    AngularFireDatabaseModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    AngularFireMessagingModule,
    NgbModule

  ],
  providers: [
    BsModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  },
    CallBack,
    { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9000] : undefined },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '422619303279-a7rqi5qob4lgjctd5onij0sj55hbpjl6.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('676945993449637')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
