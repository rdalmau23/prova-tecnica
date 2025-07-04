import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
  imports: [CommonModule],
  standalone: true
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
      });
    }
  }

  deleteUser() {
    if (this.user && confirm('Seguro que vols eliminar aquest usuari?')) {
      this.userService.deleteUser(this.user.id).subscribe(() => {
        alert('Usuario eliminat');
        this.router.navigate(['/users']);
      });
    }
  }
}