import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaceSnapObj } from '../../../core/models/face-snap_obj';
import { FaceSnap } from '../face-snap/face-snap';
import { FaceSnapService } from '../../../core/services/face_snaps.service';
import { interval, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-face-snap-list',
  imports: [FaceSnap, AsyncPipe, NgForOf],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss'
})
export class FaceSnapList implements OnInit{

  
    faceSnaps$!: Observable<FaceSnapObj[]>;

    constructor(private faceSnapService: FaceSnapService){}


  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
  }

}
