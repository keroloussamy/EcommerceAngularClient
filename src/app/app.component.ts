import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Client';
  

  constructor(private router:Router, private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit(): void {
    
  }

  showAdminLayout(){
    if (this.router.url.startsWith('/admin/') || this.router.url.startsWith('/admin')) {
      return true;
    } else {
      return false;
    }
  }
}
