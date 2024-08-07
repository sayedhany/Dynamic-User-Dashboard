import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { MatButton } from '@angular/material/button';
import { LoadingComponent } from '../loading/loading.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterModule, MatButton, LoadingComponent, NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private usersSrv: UsersService) {}
  user: User;
  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') as string;
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.usersSrv.getUser(id).subscribe((user: any) => {
      this.user = user.data;
    });
  }
}
