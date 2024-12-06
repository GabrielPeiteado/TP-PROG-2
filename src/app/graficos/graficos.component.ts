import { Component, OnInit } from '@angular/core';
import { VentasService } from '../ventas.service';
import { Chart, registerables, ChartDataset, ChartType, CategoryScale, LinearScale, LineController, BarController, PointElement, LineElement, BarElement } from 'chart.js';
import { AuthService } from '../auth.service';

Chart.register(...registerables);
Chart.register(CategoryScale, LinearScale, LineController, BarController, PointElement, LineElement, BarElement); 

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  chart: Chart | undefined;
  chartData: any = {};
  chartOptions: any = {};
  chartType: ChartType = 'line';
  userRole: string = '';

  constructor(private ventasService: VentasService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerDatosVentas();
    this.obtenerRolUsuario();
  }

  obtenerRolUsuario(): void {
    this.userRole = this.authService.getUserRole();
  }

  obtenerDatosVentas() {
    this.ventasService.getVentasMensuales().subscribe((datos: any[]) => {
      const sucursales: string[] = [...new Set(datos.map(d => d.nombre_suc))];
      const meses: string[] = [...new Set(datos.map(d => d.mes))];

      const datasets: ChartDataset<'line' | 'bar'>[] = sucursales.map((sucursal: string, index: number) => {
        const sucursalData = meses.map((mes: string) => {
          const venta = datos.find(d => d.nombre_suc === sucursal && d.mes === mes);
          return venta ? venta.monto : 0;
        });

        return {
          label: sucursal,
          data: sucursalData,
          borderColor: `hsl(${index * 360 / sucursales.length}, 100%, 50%)`,
          backgroundColor: `rgba(${index * 40}, 100, 200, 0.5)`,
          fill: this.chartType !== 'line',
        };
      });

      this.chartData = {
        labels: meses,
        datasets: datasets,
      };

      this.chartOptions = {
        responsive: true,
        plugins: {
          legend: { 
            display: this.userRole === 'admin',
            position: 'top'
          },
        },
        scales: {
          x: { 
            stacked: this.chartType === 'bar' && this.chartOptions.scales.y.stacked
          },
          y: { 
            stacked: this.chartType === 'bar' && this.chartOptions.scales.x.stacked
          },
        },
      };

      this.crearGrafico();
    });
  }

  crearGrafico() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });
  }

  mostrarGrafico(tipo: string) {
    if (tipo === 'barStacked') {
      this.chartType = 'bar';
      this.chartOptions.scales.x.stacked = true;
      this.chartOptions.scales.y.stacked = true;
    } else {
      this.chartType = tipo as ChartType;
      this.chartOptions.scales.x.stacked = false;
      this.chartOptions.scales.y.stacked = false;
    }
    
    this.obtenerDatosVentas();
  }
}
