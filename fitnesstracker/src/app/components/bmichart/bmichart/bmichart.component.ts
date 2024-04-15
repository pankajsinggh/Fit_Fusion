import { Component, OnInit } from '@angular/core';
import { ApicallsService } from '../../../services/apicalls.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-bmichart',
  templateUrl: './bmichart.component.html',
  styleUrls: ['./bmichart.component.css']
})
export class BmichartComponent implements OnInit {
  chart: any;
  bmis: any[] = [];

  constructor(private apiService: ApicallsService) { }

  ngOnInit(): void {
    this.fetchBmiData();
  }

  fetchBmiData(): void {
    const bmisDataString = localStorage.getItem('bmisData');
    if (!bmisDataString) {
      console.error('BMIs data not found in local storage');
      return;
    }

    const bmisData = JSON.parse(bmisDataString);

    
    // this.bmis = bmisData;
    this.bmis=this.formatDates(bmisData);

    const labels = this.bmis.map(entry => entry.recordedDate);
    const bmis = this.bmis.map(entry => entry.bmi);

    this.createChart(labels, bmis);
  }



  createChart(labels: string[], bmis: number[]): void {
    this.chart = new ApexCharts(document.getElementById('bmiChart'), {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'BMI',
        data: bmis
      }],
      xaxis: {
        categories: labels
      },
      yaxis: {
        min: 15,
        max: 25
      }
    });
    this.chart.render();
  }

  formatDates(bmis:any[]): any[]{
    return bmis.map(bmi =>{
    bmi.recordedDate = this.formatDate(bmi.recordedDate);
    return bmi;
  });
    }

    formatDate(dateString:string):string{
      const date = new Date(dateString);
      return date.toISOString().slice(0,10);
    }



}

