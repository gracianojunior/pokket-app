import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Storage } from '@ionic/storage';

import { Category } from '../../../assets/data/category.interface';
import { Value } from '../../../assets/data/value.interface';
import { FormProvider } from '../../../providers/form/form';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage implements OnInit {

  form: FormGroup;
  category: Category;
  values: Value[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public formBuilder: FormBuilder,
    public formProvider: FormProvider, private storage: Storage,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.category = this.navParams.data;
    this.onLoadValues();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.initFields()
      ])
    });
  }

  initFields(value = {
    name: '', value: '', product: '', type: '', institution: '', invDate: '', initialValue: '',
    currentValue: '', description: '', buyDate: '', provider: '', buyValue: '', creditor: '',
    debtDate: '', interest: '', mainValue: '', remainingValue: ''
  }): FormGroup {
    switch (this.category.name) {
      case 'Receitas': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Fixo Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Fixo Não-Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Variável Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Desembolso Variável Não-Obrigatório': {
        return this.formBuilder.group({
          name: [value.name, Validators.required],
          value: [value.value, Validators.required]
        });
      }
      case 'Ativos Financeiros': {
        return this.formBuilder.group({
          product: [value.product, Validators.required],
          type: [value.type, Validators.required],
          institution: [value.institution, Validators.required],
          invDate: [value.invDate, Validators.required],
          initialValue: [value.initialValue, Validators.required],
          currentValue: [value.currentValue, Validators.required]
        });
      }
      case 'Ativos Não-Financeiros': {
        return this.formBuilder.group({
          description: [value.description, Validators.required],
          type: [value.type, Validators.required],
          buyDate: [value.buyDate, Validators.required],
          provider: [value.provider, Validators.required],
          buyValue: [value.buyValue, Validators.required],
          currentValue: [value.currentValue, Validators.required]
        });
      }
      case 'Dívidas': {
        return this.formBuilder.group({
          description: [value.description, Validators.required],
          type: [value.type, Validators.required],
          creditor: [value.creditor, Validators.required],
          debtDate: [value.debtDate, Validators.required],
          interest: [value.interest, Validators.required],
          mainValue: [value.mainValue, Validators.required],
          remainingValue: [value.remainingValue, Validators.required]
        });
      }
    }
  }

  addField(): void {
    const control = <FormArray>this.form.controls.formArray;
    control.push(this.initFields());
  }

  removeField(i: number): void {
    const control = <FormArray>this.form.controls.formArray;
    control.removeAt(i);
  }

  addFilledField(value): void {
    const control = <FormArray>this.form.controls.formArray;
    control.push(this.initFields(value))
  }

  onSubmit(val: any, length: number) {
    console.log(val.formArray);
    let loader = this.loadingCtrl.create({
      content: `Salvando sua lista de ${this.category.name}`
    });
    loader.present();
    this.storage.set(this.category.name, val.formArray)
                .then(() => {
                  this.formProvider.setNumber(this.category.name, length);
                }) 
                .then(value => {
                  console.log(`Value: ${value}`);
                  console.log(value);
                  let toast = this.toastCtrl.create({
                    message: `Lista salva com sucesso!`,
                    duration: 3000
                  });
                  toast.present();
                  loader.dismiss();
                  this.navCtrl.pop();
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

  onLoadValues() {
    this.storage.get(this.category.name)
                .then(value => {
                  if(value != null) {
                    this.values = value;
                    this.removeField(0);
                    for(let i = 0; i < this.values.length; i++) {
                      this.addFilledField(this.values[i]);
                    }
                  }
                  console.log(`Values: ${this.values}`);                
                })
                .catch(err => {
                  console.log(`Error: ${err}`);
                  console.log(err);
                  let toast = this.toastCtrl.create({
                    message: `Não foi possível carregar sua lista. :(`,
                    duration: 3000
                  });
                  toast.present();
                });
  }

  onGoBack() {
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      subTitle: 'Caso volte agora, todo seu progresso no formulário será perdido.',
      buttons: [{
        text: 'Sim, tenho certeza!',
        handler: () => {
          this.navCtrl.pop();
        }
      }, 'Não, quero ficar.']
    });
    alert.present();
  }

}
