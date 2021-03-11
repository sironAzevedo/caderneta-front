import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountCreateComponent } from 'src/app/components/account/account-create/account-create.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  navigateToAccountCreate(): void {
    const id = this.route.snapshot.paramMap.get('mes');
    const dialogRef = this.dialog.open(AccountCreateComponent, {
      height: '600px',
      width: '600px',
      data: {
        mesId: id
      }
    });
  }

}
