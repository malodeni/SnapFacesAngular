import { SnapType } from "./snap-type.type";

export class FaceSnapObj {
static _id : number =0;
location?: string;
id : number;

    constructor(
        public title: string,
        public description : string,
        public imageUrl: string,
        public createdAt: Date,
        public snaps : number,
        id? : number,)
    {
        this.id = id?? FaceSnapObj._id++;
    }

    AddSnap(): void{
        this.snaps++;
    }

    RemoveSnap(): void {
        this.snaps--;
    }

    snap(snapType :SnapType){
        if(snapType === 'snap'){
     this.AddSnap()   
        }
        else if (snapType === 'unsnap'){
            this.RemoveSnap();
        }
    }

    setLocation(location: string): void{
        this.location = location;

    }

    withLocation(location : string): FaceSnapObj{
        this.setLocation(location);
        return this;
    }
}

