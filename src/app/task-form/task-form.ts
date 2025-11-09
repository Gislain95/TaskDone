import { Component } from '@angular/core';
import {BoldItalicPipe} from "../pipes/bold-italic-pipe";
import {FormsModule} from "@angular/forms";
import {UpperCasePipe} from "@angular/common";
import {TaskType} from '../types/task.type';

@Component({
  selector: 'app-task-form',
    imports: [
        BoldItalicPipe,
        FormsModule,
        UpperCasePipe
    ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {

  protected enterTitleTask = "";
  protected enterDescriptionTask= "";
  protected myTasks: TaskType [] = [];
  private currentTask: TaskType | null = null;
  protected validationMessage = "";


  protected titleWasEmpty = true;
  protected descriptionWasEmpty = true;


  public onEditTitleTask(titleTask: string): void {
    this.titleWasEmpty = titleTask.trim().length < 0;
  }


  public onEditDescriptionTask(descriptionTask: string): void {
    this.descriptionWasEmpty = descriptionTask.trim().length < 0;
  }


  public onSaveTask(): void {
    this.validationMessage = "";
    const titleEmpty = this.enterTitleTask.trim().length === 0;
    const descriptionEmpty = this.enterDescriptionTask.trim().length === 0;

    if (titleEmpty || descriptionEmpty) {
      if (titleEmpty && descriptionEmpty) {
        this.validationMessage = "Veuillez remplir le titre et la description.";
      } else if (titleEmpty) {
        this.validationMessage = "Veuillez remplir le champ titre.";
      } else if (descriptionEmpty) {
        this.validationMessage = "Veuillez remplir le champ description.";
      }
      return;
    }

    if(this.currentTask) {
      this.currentTask.title = this.enterTitleTask;
      this.currentTask.description = this.enterDescriptionTask;
      this.currentTask = null;
    }else{
      this.myTasks.push({
        id: Math.random(),
        title: this.enterTitleTask,
        description: this.enterDescriptionTask
      });
    }

    this.enterTitleTask = "";
    this.enterDescriptionTask = "";
  }

  public onDeleteTask(id: number): void {
    if(window.confirm('Êtes-vous sûr de vouloir supprimer la tâche ?')){
      this.myTasks = this.myTasks.filter(task => task.id !== id);
    }

  }

  public onUpdateTask(task: TaskType): void {
    this.currentTask = task;

    if(this.currentTask){
      this.enterTitleTask = task.title;
      this.enterDescriptionTask = task.description;
    }
  }

}
