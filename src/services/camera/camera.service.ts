import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from '@ionic-native/camera';


@Injectable()
export class CameraSerive{

    constructor(private camera: Camera){

    }

    /**
     * Schießt ein Foto
     */
    takePicture(){
        let options: CameraOptions = {
            quality: 100,
            targetWidth: 1920,
            targetHeight: 1080,
            //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            allowEdit: false,
            //saveToPhotoAlbum: true
          }
        return this.camera.getPicture(options);
    }

    /**
     * Holt Bild aus der Foto Galerie
     */
    getPicture(){
        let options: CameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,      
            quality: 100,
            encodingType: this.camera.EncodingType.JPEG,      
            correctOrientation: true
          }
        return this.camera.getPicture(options);
    }

}