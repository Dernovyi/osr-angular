import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageListComponent} from './app/image-list/image-list.component';
import {AddImageComponent} from './app/add-image/add-image.component';
import {ChangeTextComponent} from './app/change-text/change-text.component';



const routes: Routes = [
  {path: 'picture', component: ImageListComponent},
  {path: 'add-image', component: AddImageComponent},
  {path: 'chang-text/:id', component: ChangeTextComponent},
  {path: '' , redirectTo: 'picture', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
