import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangerateService } from '../services/exchangerate.service';
import { TopBarComponent } from '../top-bar/top-bar.component'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clientForm: FormGroup;
  convertedAmount = '0.00';
  updateRateConstant;

  constructor(private exchangeRateService: ExchangerateService,
    private formBuilder: FormBuilder) {
      this.clientForm = this.formBuilder.group({
        rate: [''],
        amount: ['']
      });
  }

  flagFirstCheck: boolean = true;
  flagSecondCechk: boolean = true;

  constantPENtoUSD;
  constantUSDtoPEN;

  ngOnInit(): void {
    this.updateRate();
  }

  calculate() {
    if (!this.clientForm.get('amount').value) {
      alert("Ingrese un monto correcto");
      return ;
    }
    let currency, currencyToExchange;
    if (this.clientForm.get('rate').value === 'PEN-USD') {
      currency = 'PEN';
      currencyToExchange = 'USD'; 
    } else {
      currency = 'USD';
      currencyToExchange = 'PEN'; 
    }

    const data = {
      currency,
      currencyToExchange,
      amount: this.clientForm.get('amount').value
    }

    this.exchangeRateService.calculate(data).subscribe(
      res => {
        if (res.converted.currency === 'USD') {
          this.convertedAmount = `$ ${res.converted.amount}`;
        } else {
          this.convertedAmount = `S/ ${res.converted.amount}`;
        }
      }, 
      err => {
        console.log(err);
      }
    )
  }


  updateRate() {    
    let currency, currencyToExchange;
    if (this.clientForm.get('rate').value === 'PEN-USD') {
      currency = 'PEN';
      currencyToExchange = 'USD'; 
    } else {
      currency = 'USD';
      currencyToExchange = 'PEN'; 
    }

    this.exchangeRateService.getRates().subscribe(
      data => {
        console.log(data);
        let rates = data.filter(rate => rate.currencyFrom === currency && rate.currencyTo === currencyToExchange)[0];
        this.updateRateConstant = rates.value;
      }, err => {
        console.log(err)
      }
    )
  }

}
