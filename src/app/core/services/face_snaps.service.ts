import { Injectable } from "@angular/core";
import { FaceSnap } from "../../face-snaps/components/face-snap/face-snap";
import { FaceSnapObj } from "../models/face-snap_obj";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class FaceSnapService{



  constructor(private http : HttpClient){

  }


    getAllFaceSnaps(): Observable<FaceSnapObj[]> {
        return this.http.get<FaceSnapObj[]>(' http://localhost:3000/facesnaps');
    }

    getFaceSnapById(faceSnapId?: number): Observable<FaceSnapObj> {
      return this.http.get<FaceSnapObj>(`http://localhost:3000/facesnaps/${faceSnapId}`)
    }



snapFaceSnapById(snapType: SnapType, faceSnapId?: number): Observable<FaceSnapObj> {
  return this.getFaceSnapById(faceSnapId).pipe(
    map(faceSnap => {
      const newSnaps = faceSnap.snaps + (snapType === 'snap' ? 1 : -1);
      return new FaceSnapObj(
        faceSnap.title,
        faceSnap.description,
        faceSnap.imageUrl,
        faceSnap.createdAt,
        newSnaps
      ).withLocation(faceSnap.location ?? '');
    }),
    switchMap(updatedFaceSnap =>
      this.http.put<FaceSnapObj>(
        `http://localhost:3000/facesnaps/${faceSnapId}`,
        updatedFaceSnap
      )
    )
  );
}

    addFaceSnap(formValue : {title : string, description: string, imageUrl : string, location?:string}) : Observable<FaceSnapObj> {
      return this.getAllFaceSnaps().pipe(
        map( (facesnaps : FaceSnapObj[])=> [...facesnaps].sort((a , b ) => a.id - b.id)),
        map((sortedFacesnaps: FaceSnapObj[]) => sortedFacesnaps[sortedFacesnaps.length - 1]),
        map(previousFacesnap => ({
            ...formValue,
            snaps : 0,
            createdAt : new Date,
            id: previousFacesnap.id +1
          })),
          switchMap(newFaceSnap => this.http.post<FaceSnapObj>('http://localhost:3000/facesnaps', newFaceSnap))
      );
     // this.newFaceSnap.push(newFaceSnap);
    }

}

