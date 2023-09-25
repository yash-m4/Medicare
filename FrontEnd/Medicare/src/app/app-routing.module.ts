import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
  path:'',
  component:DashboardComponent
  },
  {
  path:'dashboard',
  component:DashboardComponent
  },
  {
  path:'login',
  component:LoginComponent
  },
  {
  path:'register',
  component:RegisterComponent
  },
  {
  path:'admin',
  component:AdminDashboardComponent
  },
  {
    path:'cart',
    component:CartComponent
    },
    {
      path:'payment',
      component:PaymentComponent
      },
      {
        path:'order',
        component:OrderDetailsComponent
        },
  {
  path:'customer',
  component:CustomerDashboardComponent,
  },
  {
   path:'aboutUs',
  component:AboutUsComponent
  },
  {
  path:'contact',
  component:ContactComponent
  },
  {
    path:'manageCategory',
    component:ManageCategoryComponent
    },
     {
      path:'manageProduct',
        component:ManageProductComponent
      },
      {
    path:'viewProducts',
        component:ViewProductComponent
        },
        {
          path:'edit',
              component:EditProductComponent
              }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
