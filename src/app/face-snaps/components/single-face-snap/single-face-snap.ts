import { Component, OnInit } from '@angular/core';
import { FaceSnapObj } from '../../../core/models/face-snap_obj';
import { DatePipe, LowerCasePipe, NgClass, NgStyle, PercentPipe, TitleCasePipe, UpperCasePipe, NgIf, AsyncPipe } from '@angular/common';
import { FaceSnapService } from '../../../core/services/face_snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  imports: [
    NgStyle,
    NgClass,
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    PercentPipe,
    RouterLink,
    NgIf,
    AsyncPipe
],
  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.scss'
})
export class SingleFaceSnap implements OnInit{
  faceSnap$ !: Observable<FaceSnapObj>;
  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private faceSnapService : FaceSnapService,
              private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.PrepareInterface();
   this.getFaceSnap();
  }

  onSnap(faceSnapId ?: number): void {
    if (this.userHasSnapped)
    {
      this.unSnap(faceSnapId);
    }
    else{
      this.Snap(faceSnapId);
    }
  }

  unSnap(faceSnapId? : number){
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById('unsnap', faceSnapId).pipe(
        tap( (updatedSnap) => {
      this.snapButtonText="Oh Snap!";
      this.userHasSnapped=false;
      this.faceSnap$ = of(updatedSnap);
        })
      );
  }

  Snap(faceSnapId? : number){
      this.faceSnap$ = this.faceSnapService.snapFaceSnapById('snap', faceSnapId).pipe(
      tap( (updatedSnap) => {
      this.snapButtonText="Oops, unSnap!";
      this.userHasSnapped= true; 
      this.faceSnap$ = of(updatedSnap);
      })
    );
  }

  private getFaceSnap(){
   const faceSnapId= this.route.snapshot.params['id'];
   this.faceSnap$ = this.faceSnapService.getFaceSnapById(faceSnapId);
  }

  private PrepareInterface(){
  this.snapButtonText= "Oh Snap!";
   this.userHasSnapped= false;
  }
}
