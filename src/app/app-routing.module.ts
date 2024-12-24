import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    
    { path: 'home', component: HomeComponent, canActivate : [authenticationGuard]},
    { path: 'products', component: ProductsComponent },
    { path: 'customers', component: CustomersComponent },
    
    { path: 'admin', component: AdminTemplateComponent ,
        children : [
            { path: 'newProduct', component: NewProductComponent },
            { path: 'editProduct/:id', component: EditProductComponent },
        ]
    },
    
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})

export class AppRoutingModule { }
