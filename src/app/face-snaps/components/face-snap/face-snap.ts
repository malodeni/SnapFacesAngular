import { Component, Input, OnInit } from '@angular/core';
import { FaceSnapObj } from '../../../core/models/face-snap_obj';
import {UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  imports: [
    UpperCasePipe,
  ],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss'
})
export class FaceSnap  {
@Input() faceSnap!: FaceSnapObj;


  constructor(private router : Router){

  }
  onViewFaceSnap(){
    this.router.navigate(['facesnaps', this.faceSnap.id]);
  }


}
