import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder,
              private router:Router) { 
    this.clientForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  createClient() {
    const data = {
      email: this.clientForm.get('email').value,
      password: this.clientForm.get('password').value,
    }
    this.clientService.login(data).subscribe(
      res => {
        alert('Cliente creado correctamente');
        this.router.navigate(['/home'])
        localStorage.setItem('token', res.token);
        //this.cleanFields();
      }, 
      err => {
        console.log(err);
      }
    )
  }

  cleanFields(){
    this.clientForm.get('name').setValue(""),
    this.clientForm.get('lastName').setValue(""),
    this.clientForm.get('age').setValue(""),
    this.clientForm.get('dateBorn').setValue("")
  }

}
