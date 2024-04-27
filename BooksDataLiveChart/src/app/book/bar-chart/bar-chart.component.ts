import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js/auto";
import {SocketService} from "../socket.service";

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit{
  chart:any;

  constructor(
    private socketService: SocketService
  ) { }
  ngOnInit(): void {
    this.socketService.listen('dataupdate').subscribe((res:any) =>{
      console.log(res);
      this.createChart(res);
      // this.chart.data.datasets[0].data = res;
      // this.chart.update();
    });

  }

  createChart(data: { published: number; count: number }[]): void {
    const labels = data.map(item => item.published.toString());
    const counts = data.map(item => item.count);

    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Count Of Published Books',
            data: counts,
            backgroundColor: '#0d6efd'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
