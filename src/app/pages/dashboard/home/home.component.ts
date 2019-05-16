import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { connect } from 'mqtt';


const client  = connect('mqtt://192.168.1.199:1884');
var status='';
var brightness='';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isDisabled = false;
  @ViewChild('slider')slider;

  constructor(private auth:AuthService) {
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
            status=message.toString();
          }
          else
          {
            brightness = message.toString();
          }
          
        })
     
     
  });
   
   }

  ngOnInit() {
  }

  
  logout()
  {
    this.auth.logout();
  }

  toogleLight()
    {
      console.log(status);
      if(status== '1')
      {
        this.isDisabled=true;
        this.slider.value=2;
        client.publish('led','0');
      }
      else
      {
        this.isDisabled=false;
        if(brightness != '')
        {
        this.slider.value=brightness;
        client.publish('led',brightness);
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
 
}
