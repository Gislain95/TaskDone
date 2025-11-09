import { Component } from '@angular/core';
import {BoldItalicPipe} from "../pipes/bold-italic-pipe";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {TaskType} from '../types/task.type';

@Component({
  selector: 'app-task-form',
  imports: [
    BoldItalicPipe,
    FormsModule,
    UpperCasePipe,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {

  protected myTasks: TaskType [] = [];
  private currentTask: TaskType | null = null;


  protected taskForms = new FormGroup({
    enterTitleTask: new FormControl('', [Validators.required]),
    enterDescriptionTask: new FormControl('', [Validators.required])
  })


  public onSaveTask(): void {
    if(this.currentTask) {
      this.currentTask.title = this.taskForms.controls.enterTitleTask.value;
      this.currentTask.description = this.taskForms.controls.enterDescriptionTask.value;
      this.currentTask = null;
    }else{
      this.myTasks.push({
        id: Math.random(),
        title: this.taskForms.controls.enterTitleTask.value,
        description: this.taskForms.controls.enterDescriptionTask.value
      });
    }

  }

  public onDeleteTask(id: number): void {
    if(window.confirm('Êtes-vous sûr de vouloir supprimer la tâche ?')){
      this.myTasks = this.myTasks.filter(task => task.id !== id);
    }

  }

  public onUpdateTask(task: TaskType): void {
    this.currentTask = task;

    if(this.currentTask){
      this.taskForms.controls.enterTitleTask.patchValue(task.title);
      this.taskForms.controls.enterDescriptionTask.patchValue(task.description);
    }
  }

}
