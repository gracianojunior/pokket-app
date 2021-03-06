import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-graficos',
  templateUrl: 'graficos.html',

})


export class GraficosPage {

  formListPage = `FormListPage`;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public doughnutChartLabels: string[] = ['Dados 1', 'Dados 2', 'Dados 3'];
  public doughnutChartData: number[] = [1500, 3000, 1235];
  public doughnutChartType: string = 'doughnut';

  public BarChartLabels: string[] = ["Apressados", "Com Calma", "Tranquilos"];
  public BarChartType: string = 'bar';
  public BarChartDataSets: Object = [
    {
      label: 'Meus: ',
      data: [12, 50, 20],
      borderWidth: 1
    },
    {
      label: 'Abreu: ',
      data: [70, 30, 10],
      borderWidth: 1
    }
  ];

  public BarObjectOptions: Object = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#1d1de2',
      borderColor: '#1d1de2',
      pointBackgroundColor: '#1d1de2',
      pointBorderColor: '#1d1de2',
      pointHoverBackgroundColor: '#1d1de2',
      pointHoverBorderColor: '#1d1de2',
      labels: '#1d1de2'
    },
    {
      backgroundColor: '#1d1de2',
      borderColor: '#1d1de2',
      pointBackgroundColor: '#1d1de2',
      pointBorderColor: '#1d1de2',
      pointHoverBackgroundColor: '#1d1de2',
      pointHoverBorderColor: '#1d1de2',
      labels: '#1d1de2'
    },
    {
      backgroundColor: '#3F51B5',
      borderColor: '#3F51B5',
      pointBackgroundColor: '#3F51B5',
      pointBorderColor: '#3F51B5',
      pointHoverBackgroundColor: '#3F51B5',
      pointHoverBorderColor: '#3F51B5',
      labels: '#3F51B5'
    }

  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficosPage');
  }

  onGoBack() {
    this.navCtrl.popToRoot();
  }


}
