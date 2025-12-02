import { Component, Injectable, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { FaceSnapObj } from '../../../core/models/face-snap_obj';
import { AsyncPipe, DatePipe, NgIf, UpperCasePipe } from "@angular/common";
import { FaceSnapService } from '../../../core/services/face_snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  imports: [ReactiveFormsModule, NgIf, UpperCasePipe, DatePipe, AsyncPipe],
  templateUrl: './new-face-snap.html',
  styleUrl: './new-face-snap.scss'
})

export class NewFaceSnap  implements OnInit{

  snapForm!: FormGroup
  faceSnapPreview$!: Observable<FaceSnapObj>
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private faceSnapService : FaceSnapService,
              private router : Router
  ){
  }
  

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required,Validators.pattern(this.urlRegex)]],
      location: [null]
    },{
      updateOn : 'blur'
  });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue =>({
        ...formValue,
        createdAt : new Date,
        id : 0,
        snaps :0
      }))
    );

  }

  onSubmitForm(): void{
  this.snapForm.updateValueAndValidity();
    this.faceSnapService.addFaceSnap(this.snapForm.value).pipe(
    tap(() => this.router.navigateByUrl('/facesnaps'))
    ).subscribe();
  }
}
