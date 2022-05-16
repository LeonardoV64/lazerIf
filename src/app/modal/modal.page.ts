import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { LocaisService, Local } from '../services/locais.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {
  @Input() id: string;
  local: Local = null;

  constructor(private locaisService: LocaisService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.locaisService.getLocalById(this.id).subscribe(res => {
      this.local = res;
    });
  }

  async deleteLocal() {
    await this.locaisService.deleteLocal(this.local)
    this.modalCtrl.dismiss();
  }

  async updateLocal() {
    await this.locaisService.updateLocal(this.local);
    const toast = await this.toastCtrl.create({
      message: 'Registro Alterado !',
      duration: 2000
    });
    toast.present();
 
  }

}
