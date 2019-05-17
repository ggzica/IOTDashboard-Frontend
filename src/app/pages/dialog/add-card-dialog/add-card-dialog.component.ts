import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.css']
})
export class AddCardDialogComponent implements OnInit {

  public components=[
    {
      status:false
    },
    {
      status:false
    }
  ]
  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  selectComp(comp:any)
  {
    if(this.components[comp].status == false)
    {
      this.components[comp].status = true;
    }
    else
    {
      this.components[comp].status = false;
    }
  }

  Next()
  {
    if(this.components[0].status == false && this.components[1].status == false)
    {
      this.auth.snackbarOpen('Please Select At Least One Component!');
    }
  }
}
