import { Component, Output, EventEmitter } from '@angular/core';  // Correct import from @angular/core
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user'; // Import the User model

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Output() userAdded = new EventEmitter<User>(); // Event emitter to send data to parent component
  user: User = { name: '', email: '', role: 'Admin' };
  roles: string[] = ['Admin', 'Editor', 'Viewer'];

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent> // Inject MatDialogRef to close the modal
  ) {}

  submitForm() {
    if (this.user.name && this.user.email && this.user.role) {
      this.userAdded.emit(this.user); // Emit the user data to the parent
      this.dialogRef.close(this.user); // Close the modal and send the user data back to the parent
    }
  }
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { User } from '../models/user';
// import { UserService } from '../services/user.service';

// @Component({
//   selector: 'app-user-form',
//   templateUrl: './user-form.component.html',
//   styleUrls: ['./user-form.component.css'],
// })
// export class UserFormComponent {
//   user: User = { name: '', email: '', role: 'Admin' };
//   roles: Array<'Admin' | 'Editor' | 'Viewer'> = ['Admin', 'Editor', 'Viewer'];
//   submitted = false;

//   constructor(private userService: UserService, private router: Router) {}

//   submitForm() {
//     this.userService.addUser(this.user);
//     this.submitted = true;
//     this.router.navigate(['/'])
//   }
// }

