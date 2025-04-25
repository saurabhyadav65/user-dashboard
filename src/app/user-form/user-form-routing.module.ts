import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: UserFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule 
  ]
})
export class UserFormRoutingModule { }
