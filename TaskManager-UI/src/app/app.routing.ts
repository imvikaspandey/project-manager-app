import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ViewTaskComponent } from './view-task/view-task.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
    },
    { path: 'user', component: UserComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'addTask', component: AddTasksComponent },
    { path: 'addTask/:id', component: AddTasksComponent },
    { path: 'viewTask', component: ViewTaskComponent },
    // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    // { path: 'shopping', component: ShoppingPageComponent, canActivate: [AuthGuard] },
    // { path: 'myOrders', component: MyOrdersComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: 'user' }
];

export const TaskManagerRouting = RouterModule.forRoot(routes);
