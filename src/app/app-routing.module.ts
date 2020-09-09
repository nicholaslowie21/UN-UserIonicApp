import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [TutorialGuard, AuthGuard]
  },{
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'userRegister',
    loadChildren: () => import('./users/userRegister/userRegister.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then( m => m.ResourcesPageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./marketplace/marketplace.module').then( m => m.MarketplacePageModule)
  },
  {
    path: 'register-split',
    loadChildren: () => import('./split/register-split/register-split.module').then( m => m.RegisterSplitPageModule)
  },
  {
    path: 'institution-register',
    loadChildren: () => import('./institutions/institution-register/institution-register.module').then( m => m.InstitutionRegisterPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./accountmanagement/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'update-username',
    loadChildren: () => import('./accountmanagement/update-username/update-username.module').then( m => m.UpdateUsernamePageModule)
  },
  {
    path: 'update-email',
    loadChildren: () => import('./accountmanagement/update-email/update-email.module').then( m => m.UpdateEmailPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./accountmanagement/forget-password/forget-password.module').then( m => m.ForgetpasswordPageModule)
  },
  {
    path: 'accountsettings',
    loadChildren: () => import('./nav/accountsettings/accountsettings.module').then( m => m.AccountsettingsPageModule)
  },
  {
    path: 'request-verification',
    loadChildren: () => import('./accountmanagement/request-verification/request-verification.module').then( m => m.RequestVerificationPageModule)
  },
  {
    path: 'change-photo',
    loadChildren: () => import('./change-photo/change-photo.module').then( m => m.ChangePhotoPageModule)
  },
  {
    path: 'my-projects',
    loadChildren: () => import('./my-projects/my-projects.module').then( m => m.MyProjectsPageModule)
  },  {
    path: 'my-resources',
    loadChildren: () => import('./my-resources/my-resources.module').then( m => m.MyResourcesPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
