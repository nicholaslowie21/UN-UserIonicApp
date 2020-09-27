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
    path: 'institution-register',
    loadChildren: () => import('./institutions/institution-register/institution-register.module').then( m => m.InstitutionRegisterPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./accountmanagement/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
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
    path: 'my-projects/:Id',
    loadChildren: () => import('./my-projects/my-projects.module').then( m => m.MyProjectsPageModule)
  },
  {
    path: 'my-resources',
    loadChildren: () => import('./resourcemanagement/my-resources/my-resources.module').then( m => m.MyResourcesPageModule)
  },
  {
    path: 'affiliation-management/:Id',
    loadChildren: () => import('./institutions/affiliation-management/affiliation-management.module').then( m => m.AffiliationManagementPageModule)
  },
  {
    path: 'add-member',
    loadChildren: () => import('./institutions/add-member/add-member.module').then( m => m.AddMemberPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'create-resource',
    loadChildren: () => import('./resourcemanagement/create-resource/create-resource.module').then( m => m.CreateResourcePageModule)
  },
  {
    path: 'edit-resource/:type/:id',
    loadChildren: () => import('./resourcemanagement/edit-resource/edit-resource.module').then( m => m.EditResourcePageModule)
  },
  {
    path: 'view-resource/:type/:id',
    loadChildren: () => import('./resourcemanagement/view-resource/view-resource.module').then( m => m.ViewResourcePageModule)
  },
  {
    path: 'project-creation',
    loadChildren: () => import('./project-creation/create-project/create-project.module').then( m => m.CreateProjectPageModule)
  },
  {
    path: 'update-project/:Id',
    loadChildren: () => import('./project-creation/update-project/update-project.module').then( m => m.UpdateProjectPageModule)
  },
  {
    path: 'view-project/:Id',
    loadChildren: () => import('./project-creation/view-project/view-project.module').then( m => m.ViewProjectPageModule)
  },
  {
    path: 'kpi-management/:Id',
    loadChildren: () => import('./kpi/kpi-management/kpi-management.module').then( m => m.KpiManagementPageModule)
  },
  {
    path: 'create-kpi/:Id',
    loadChildren: () => import('./kpi/create-kpi/create-kpi.module').then( m => m.CreateKpiPageModule)
  },
  {
    path: 'upload-projectPic/:Id',
    loadChildren: () => import('./project-creation/upload-project-pic/upload-project-pic.module').then( m => m.UploadProjectPicPageModule)
  },
  {
    path: 'view-admins/:Id',
    loadChildren: () => import('./projectAdminManagement/view-admins/view-admins.module').then( m => m.ViewAdminsPageModule)
  },
  {
    path: 'resource-needs-management/:Id',
    loadChildren: () => import('./resourceNeeds/resource-needs-management/resource-needs-management.module').then( m => m.ResourceNeedsManagementPageModule)
  },
  {
    path: 'create-resource-need/:Id',
    loadChildren: () => import('./resourceNeeds/create-resource-need/create-resource-need.module').then( m => m.CreateResourceNeedPageModule)
  },
  {
    path: 'update-kpi/:Id',
    loadChildren: () => import('./kpi/update-kpi/update-kpi.module').then( m => m.UpdateKpiPageModule)
  },
  {
    path: 'update-resource-needs/:Id',
    loadChildren: () => import('./resourceNeeds/update-resource-needs/update-resource-needs.module').then( m => m.UpdateResourceNeedsPageModule)
  },
  {
    path: 'create-money-resource-need/:Id/:title/:desc',
    loadChildren: () => import('./resourceNeeds/create-money-resource-need/create-money-resource-need.module').then( m => m.CreateMoneyResourceNeedPageModule)
  },
  {
    path: 'view-others-profile/:username/:contributorType',
    loadChildren: () => import('./view-others-profile/view-others-profile.module').then( m => m.ViewOthersProfilePageModule)
  },
  {
    path: 'knowledge/edit-owners/:id',
    loadChildren: () => import('./resourcemanagement/edit-owners/edit-owners.module').then( m => m.EditOwnersPageModule)
  },
  {
    path: 'upload-resource-pic/:type/:id',
    loadChildren: () => import('./resourcemanagement/upload-resource-pic/upload-resource-pic.module').then( m => m.UploadResourcePicPageModule)
  },
  {
    path: 'knowledge/upload-attachment/:id',
    loadChildren: () => import('./resourcemanagement/upload-attachment/upload-attachment.module').then( m => m.UploadAttachmentPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
