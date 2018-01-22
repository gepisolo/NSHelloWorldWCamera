import { Component } from "@angular/core";
import * as Camera from "nativescript-camera";
import * as FileSystem from "tns-core-modules/file-system";
import * as imageSource from "tns-core-modules/image-source";
@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App" class="action-bar"></ActionBar>
    <!-- Your UI components go here -->
    <StackLayout>
        <Button text="Take a picture" (tap)="takePicture()"></Button>
    </StackLayout>
  `
})
export class AppComponent {
  // Your TypeScript logic goes here
  takePicture(){
    Camera.requestPermissions();
    Camera.takePicture({saveToGallery: false}).then((picture) => {
      const folder = FileSystem.knownFolders.documents();
      const path = FileSystem.path.join(folder.path, "test.png");
      const source = new imageSource.ImageSource();
      source.fromAsset(picture).then((newSource) => {
        const saved = source.saveToFile(path, "png");
        alert("Saved is " + saved);
      });
    });
  }

}
