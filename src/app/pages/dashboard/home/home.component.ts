import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { connect } from 'mqtt';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddCardDialogComponent } from '../../dialog/add-card-dialog/add-card-dialog.component';

const client  = connect('mqtt://192.168.1.199:1884');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isDisabled = false;
  public stats='0';
  public brightness='150';
  private self=this;
  @ViewChild('slider')slider;

  constructor(private auth:AuthService,public dialog: MatDialog) {
   
   
   }

  ngOnInit() {
    var self=this;
    client.on('connect', function () {
      client.subscribe('status', function (err) {
          if (!err) {
              console.log('connected');
              client.subscribe('on');
              client.subscribe('brightness');
          }
          else {
              console.log(err);
          }
      });
        client.on('message',function(topic,message)
        {
          if(topic.toString()=='on')
          {
            self.stats=message.toString();
          }
          else
          {
            self.brightness = message.toString();
          }
          
        })
     
     
  });
  }

  
  logout()
  {
    this.auth.logout();
  }

  toogleLight()
    {
      
      if(this.stats== '1')
      {
        this.isDisabled=true;
        this.slider.value=2;
        client.publish('led','0');
      }
      else
      {
        this.isDisabled=false;
        if(this.brightness != '')
        {
        this.slider.value=this.brightness;
        client.publish('led',this.brightness);
        } else       
        {
          this.slider.value=150;
        client.publish('led','1');
        }
  
      }
      
    
  }


  pitch(event: any) {
      client.publish('led',event.value.toString());
  }
 

  AddCardDialog()
  {
    const dialogRef = this.dialog.open(AddCardDialogComponent   );
  }
}
