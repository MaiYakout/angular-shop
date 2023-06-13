import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedBidsComponent } from './components/pages/applied-bids/applied-bids.component';
import { AppliedformComponent } from './components/pages/appliedform/appliedform.component';
import { AvilableBidsComponent } from './components/pages/avilable-bids/avilable-bids.component';
import { BidDetailsComponent } from './components/pages/bid-details/bid-details.component';
import { ChatComponent } from './components/pages/chat/chat.component';
import { ComingsoonComponent } from './components/pages/comingsoon/comingsoon.component';
import { CompleteProfileComponent } from './components/pages/complete-profile/complete-profile.component';
import { CompleteResetPasswordComponent } from './components/pages/complete-reset-password/complete-reset-password.component';
import { CompleteSellerComponent } from './components/pages/complete-seller/complete-seller.component';
import { CreateBidSellerComponent } from './components/pages/create-bid-seller/create-bid-seller.component';
import { CreateBidsComponent } from './components/pages/create-bids/create-bids.component';
import { EditBidSellerComponent } from './components/pages/edit-bid-seller/edit-bid-seller.component';
import { EditBidComponent } from './components/pages/edit-bid/edit-bid.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MessageComponent } from './components/pages/message/message.component';
import { MyBidsComponent } from './components/pages/my-bids/my-bids.component';
import { NotificationComponent } from './components/pages/notification/notification.component';
import { PaymentComponent } from './components/pages/payment/payment.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterBuyerComponent } from './components/pages/register-buyer/register-buyer.component';
import { RegisterSellerComponent } from './components/pages/register-seller/register-seller.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RequestComponent } from './components/pages/request/request.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { SellerDetailsComponent } from './components/pages/seller-details/seller-details.component';
import { SocialLoginComponent } from './components/pages/social-login/social-login.component';
import { SplashScreenComponent } from './components/pages/splash-screen/splash-screen.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { VerificationComponent } from './components/pages/verification/verification.component';


const routes: Routes = [
  { path: '',pathMatch: 'full', redirectTo: '/comingSoon' },
  { path: 'loading', component: SplashScreenComponent },
  { path: 'comingSoon', component: ComingsoonComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'complete-reset-password', component: CompleteResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-buyer', component: RegisterBuyerComponent },
  { path: 'register-seller', component: RegisterSellerComponent },
  { path: 'login-social', component: SocialLoginComponent },

  { path: 'verification', component: VerificationComponent },
  { path: 'complete-profile', component: CompleteProfileComponent },
  { path: 'complete-profile-seller', component: CompleteSellerComponent },
  { path: 'bids', component: MyBidsComponent },
  { path: 'create-bid', component: CreateBidsComponent },
  { path: 'edit-bid', component: EditBidComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'message', component: MessageComponent },
  { path: 'Available-Bids', component: AvilableBidsComponent },
  { path: 'Applied-Bids', component: AppliedBidsComponent },
  { path: 'Applied', component: AppliedformComponent },
  { path: 'seller-requests', component: RequestComponent },
  { path: 'bidDetails', component: BidDetailsComponent },
  { path: 'bid-detailes', component: SellerDetailsComponent },
  { path: 'create-bid-seller', component: CreateBidSellerComponent },
  { path: 'edit-bid-seller', component: EditBidSellerComponent },
  { path: 'payment/verify/:id', component: PaymentComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { scrollPositionRestoration :'top'},
    
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
