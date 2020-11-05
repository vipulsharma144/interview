import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const appRoutes: Routes = [

    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        
    },
    {
        path: 'backend',
        loadChildren: './customers/customers.module#CustomersModule',
        
    },
    {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        
    },
    
  
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
