import { Component, ViewEncapsulation } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from '../../services/loader.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.ShadowDom //ok this is basically a way to contain the styles of this to make it not mess with other things from what i understand -adolfo
})
export class SpinnerComponent {
  private isvisible: boolean = false
  constructor( public loader:LoaderService
  ){}
  toggle(){ //this is for a button that i used to test to see if this thing exists
    this.isvisible = !this.isvisible
  }
}
