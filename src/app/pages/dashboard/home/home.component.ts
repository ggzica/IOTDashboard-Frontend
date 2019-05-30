import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { connect } from 'mqtt';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSlideToggleChange} from '@angular/material';
import { AddCardDialogComponent } from '../../dialog/add-card-dialog/add-card-dialog.component';

const client  = connect('mqtt://192.168.1.199:1884');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isDisabled = false;
  public isAuto=false;
  public stats='0';
  public brightness='150';
  public auto='0';
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
              client.subscribe('onStatus');
              client.subscribe('brightnessStatus');
              client.subscribe('autoStatus')
          }
          else {
              console.log(err);
          }
      });
        client.on('message',function(topic,message)
        {
          switch(topic.toString())
          {
            case 'onStatus':self.stats=message.toString();break;
            case 'brightnessStatus':self.brightness = message.toString();break;
            case 'autoStatus':self.auto=message.toString();break;
          }
        })
  });
    if(this.stats == '0')
    {
      this.isDisabled=true;
    }
}

  
  logout()
  {
    this.auth.logout();
  }

  toogleLight()
    {
  
      if(this.stats != '0')
      {
        this.isDisabled=true;
        this.slider.value=2;
        client.publish('on','0');
      }
      else
      {
        this.isDisabled=false;
        if(this.brightness != '')
        {
        this.slider.value=this.brightness;
        client.publish('on','1');
        client.publish('brightness',this.brightness);
        } else       
        {
          this.slider.value=150;
        client.publish('on','1');
        }
  
      }
      
    
  }


  toogleAuto(value: MatSlideToggleChange)
  {
    if(this.auto == '0')
    {
      client.publish('auto','1');
      this.isAuto=true;
    }
    else
    {
      this.isAuto=false;
      client.publish('auto','0');
    }
     }

  pitch(event: any) {
      client.publish('brightness',event.value.toString());
  }
 

  AddCardDialog()
  {
    const dialogRef = this.dialog.open(AddCardDialogComponent   );
  }
}
