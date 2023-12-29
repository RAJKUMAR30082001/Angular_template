import { Component, Injectable, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
export interface details {
  Name:string
  accountNumber:string
  bankName:string
  Amount:string
}

export class BankingFunction{
    public _name?:string
    public _bankname?:string
    public _accountnumber?:string
    public _amount?:string

    constructor(userdet?:details){
      if(userdet){
      this._name = userdet.Name||'';
      this._bankname= userdet.bankName||"";
      this._accountnumber = userdet.accountNumber||"";
      this._amount = userdet.Amount||"";
    }
    }
    get Name(): string | undefined {
      return this._name;
    }
  
    set Name(value: string | undefined) {
      this._name = value;
    }
  
    // Getter and Setter for _bankname
    get bankName(): string | undefined {
      return this._bankname;
    }
  
    set bankName(value: string | undefined) {
      this._bankname = value;
    }
  
    // Getter and Setter for _accountnumber
    get accountNumber(): string | undefined {
      return this._accountnumber;
    }
  
    set accountNumber(value: string | undefined) {
      this._accountnumber = value;
    }
  
    // Getter and Setter for _amount
    get Amount(): string | undefined {
      return this._amount;
    }
  
    set Amount(value: string | undefined) {
      this._amount = value;
    }
}
@Component({
  selector: 'app-bank-application',
  templateUrl: './bank-application.component.html',
  styleUrls: ['./bank-application.component.scss']
})

export class BankApplicationComponent {
  private bankingFunctionInstance!: BankingFunction;
  public _Amount:number|undefined=0
  public accountNumber:string=''
  
  public UserDetail:BankingFunction[]=[]
  public CustomerDetail= new FormGroup({
    Name:new FormControl(''),
    accountNumber:new FormControl(''),
    bankName:new FormControl(''),
    Amount:new FormControl('')

  })
  @ViewChild('myForm') myForm: any;

  public operation:'deposit'|'withdraw'|'checkbalance'|''='';
  public deposit(){
   
    this.operation='deposit'
  }
  public withdraw(){
    
    this.operation='withdraw'
  }
  public checkbalance(){
    
    this.operation='checkbalance'
  }
  submitForm(){
    if(this.findNAN(this.CustomerDetail.value.Amount|| "")&&
    this.findValidName( this.CustomerDetail.value.Name|| "" , this.CustomerDetail.value.bankName|| "")&&
    this.findValidAccount(this.CustomerDetail.value.accountNumber|| ""))
    {
    
    if (this.operation==="deposit"){
      const obj: BankingFunction = new BankingFunction({
        Name: this.CustomerDetail.value.Name || "", 
        accountNumber: this.CustomerDetail.value.accountNumber || "",
        bankName: this.CustomerDetail.value.bankName || "",
        Amount: this.CustomerDetail.value.Amount || "",  
      });
      this.UserDetail.push(obj)
    }
    else if(this.operation==="withdraw"){
    
      for (let i of this.UserDetail){
        if ((i.accountNumber===this.CustomerDetail.value.accountNumber) && (i.Name === this.CustomerDetail.value.Name)){
          if (i && typeof i.Amount === 'number' && typeof this.CustomerDetail.value.Amount === 'number') {
            i.Amount = String(i.Amount - this.CustomerDetail.value.Amount);
            console.log(i.Amount)
          } else {
            console.error('Invalid numeric value for Amount or i is undefined');
          }        
        }
      }
    }
    else if(this.operation==='checkbalance'){
        for(let i of this.UserDetail){
          if(i.accountNumber===this.accountNumber){
            this._Amount=Number(i.Amount)
          }
        }
    }
    else alert("enter correct values")
  }

    console.log(this.UserDetail)

    console.log(this.CustomerDetail.value)
    
  }
  

  findNAN(amt:string):boolean{
      if(isNaN(parseInt(amt))||parseInt(amt)<0 ) return false
      else return true
  }
  findValidName(name: string,name1:string): boolean {
    if(isNaN(parseInt(name))&& isNaN(parseInt(name1))) return true
    else return false
  }
  findValidAccount(accountno:string){
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    if(accountno.length>10 && regex.test(accountno)) return false
    else return true ;

  }

}




