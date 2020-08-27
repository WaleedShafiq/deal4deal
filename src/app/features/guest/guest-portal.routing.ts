import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

	// 	{ path: 'admin-portal', loadChildren: () => import('../features/admin-portal/admin-portal.module').then(mod => mod.AdminPortalModule) }

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GuestPortalRoutingModule { }
