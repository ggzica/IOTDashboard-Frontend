import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dashboard';
  public isLoginPage=false;
  constructor(    private location: Location )
{
  var pathString = location.path();
  if(pathString === '/login')
  {
    this.isLoginPage=true;
    
  }
  else
  {
    this.isLoginPage = false;
  }
}
}

