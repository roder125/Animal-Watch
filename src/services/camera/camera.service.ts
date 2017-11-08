import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class CameraSerive{

    constructor(private camera: Camera){

    }

    takePicture(){
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true 
          }
        return this.camera.getPicture(options);
    }

}