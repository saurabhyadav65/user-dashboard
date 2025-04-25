import { Component, AfterViewInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ArcElement, CategoryScale, Chart, Legend, LinearScale, PieController, Title, Tooltip } from 'chart.js';  // Import Chart.js for the pie chart
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements AfterViewInit {
  users: User[] = [];
  chart: any;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      Chart.register(
        ArcElement,    
        Tooltip,       
        Legend,       
        Title,        
        CategoryScale, 
        LinearScale,
        PieController
      );

      this.updateChart();
    });
  }

  addDummyUser() {
    const newUser: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
    };
    this.userService.addUser(newUser);
  }

  updateChart() {
    const roleCounts = this.getRoleCounts();

    if (this.chart) {
      this.chart.data.datasets[0].data = [roleCounts.Admin, roleCounts.Editor, roleCounts.Viewer];
      this.chart.update();
    } else {
      this.chart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['Admin', 'Editor', 'Viewer'],
          datasets: [{
            label: 'User Roles',
            data: [roleCounts.Admin, roleCounts.Editor, roleCounts.Viewer],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            }
          }
        }
      });
    }
  }

  getRoleCounts() {
    const roleCounts = { Admin: 0, Editor: 0, Viewer: 0 };

    this.users.forEach(user => {
      if (user.role === 'Admin') {
        roleCounts.Admin++;
      } else if (user.role === 'Editor') {
        roleCounts.Editor++;
      } else if (user.role === 'Viewer') {
        roleCounts.Viewer++;
      }
    });

    return roleCounts;
  }
  openUserForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px', // Modal width
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.addUser(result); // Add user to the list after closing the modal
      }
    });
  }
}
