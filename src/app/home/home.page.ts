import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { LocaisService, Local } from '../services/locais.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;
  locais: Local[] = [];

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private locaisService: LocaisService,
    private cd: ChangeDetectorRef,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.locaisService.getLocais().subscribe(res => {
      this.locais = res;
      this.cd.detectChanges();
    })
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }


  async addLocal(){
    const alert = await this.alertController.create({
      header: 'Adicionar Local',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome do Monumento',
          type: 'text'
        },
        {
          name: 'data',
          placeholder: 'mm/dd/ano',
          type: 'date'
        },
        {
          name: 'localizacao',
          placeholder: 'Localização',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Adicionar',
          handler: res => {
            this.locaisService.addLocal({ localizacao: res.localizacao, nome: res.nome, data: res.data });
          }
        }
      ]
    });

    await alert.present();
  }

  async openLocal(local: Local){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: local.id },
      breakpoints: [0,0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }

}