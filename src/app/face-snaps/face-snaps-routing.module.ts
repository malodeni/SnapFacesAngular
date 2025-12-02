import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { SingleFaceSnap } from "./components/single-face-snap/single-face-snap";
import { FaceSnapList } from "./components/face-snap-list/face-snap-list";
import { NewFaceSnap } from "./components/new-face-snap/new-face-snap";
import { AuthGard } from "../core/guards/auth.guard";

const routes: Routes = [
    {path: "create", component : NewFaceSnap, canActivate : [AuthGard]},
    {path: ":id", component : SingleFaceSnap, canActivate : [AuthGard]},
    { path: '', component : FaceSnapList, canActivate : [AuthGard]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class FaceSnapsRoutingModule {

} 