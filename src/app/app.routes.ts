import { Routes } from '@angular/router';
import {LandingPage} from './landing-page/landing-page';
import {TaskForm} from './task-form/task-form';

export const routes: Routes = [
  {path: 'taskforms', component: TaskForm},
  {path: '', component: LandingPage},
];
