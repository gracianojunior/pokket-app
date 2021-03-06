import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import categories from '../../../assets/data/categories';
import { FormProvider } from '../../../providers/form/form';

@IonicPage()
@Component({
  selector: 'page-form-list',
  templateUrl: 'form-list.html',
})
export class FormListPage implements OnInit {

  formPage = `FormPage`;
  homePage = `HomePage`;
  navGraficosPage = `GraficosPage`;
  categories: Category[];
  numberList: number[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formProvider: FormProvider,
    private storage: Storage, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidEnter FormListPage');
    this.numberList = this.formProvider.getNumbers();
  }

  ngOnInit() {
    this.categories = categories;
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }

  onGenerateDiagnostic() {
    let loader = this.loadingCtrl.create({
      content: `Gerando seu Diagnóstico...`
    });
    loader.present();
    this.storage.set('Diagnostic', true)
                .then(value => {
                  let toast = this.toastCtrl.create({
                    message: `Diagnóstico gerado com sucesso!`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível salvar sua lista. :(`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                });
  }

}
