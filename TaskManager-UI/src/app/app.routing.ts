import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
// import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
// import { AuthGuard } from './auth-guard.service';
// import { CartComponent } from './cart/cart.component';
// import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'shopping',
    //     pathMatch: 'full'
    // },
    { path: 'user', component: UserComponent },
    { path: 'projects', component: ProjectComponent },
    // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    // { path: 'shopping', component: ShoppingPageComponent, canActivate: [AuthGuard] },
    // { path: 'myOrders', component: MyOrdersComponent, canActivate: [AuthGuard] },

    // { path: '**', redirectTo: 'shopping' }
];

export const TaskManagerRouting = RouterModule.forRoot(routes);
