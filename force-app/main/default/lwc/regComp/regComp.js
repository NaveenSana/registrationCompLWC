import { LightningElement, track,wire } from 'lwc';

// importing Registration fields
getrecords
import saveRegRecord from '@salesforce/apex/regClass.createRecord';
import fetchRegRecord from '@salesforce/apex/regClass.getrecords';
import deleteRegRecord from '@salesforce/apex/regClass.delRecord';
import editRegRecord from '@salesforce/apex/regClass.getRecordsById';

export default class RegComp extends LightningElement {

    @track val;
    @track regRecords;   

    @track regRec = {};
    // this object have record information
    /**@track regRecord = {
        fName : FirstName_FIELD,
        lName : LastName_FIELD,
        email : Email_FIELD,
        mobile : Mobile_FIELD
    };**/


    connectedCallback()
    {
        fetchRegRecord()
        .then(result=>{
            this.regRecords=result;
            window.console.log(result);
        })
        .catch(error=>{
            window.console.log(error);
        })
    }

    handleChange(event) {
        const field = event.target.name;
        debugger;
        if (field === 'txtFname') {
            console.log(event.target.value);
            //this.regRecord.fName = event.target.value;   
            this.regRec['First_Name__c'] = event.target.value;            
        } else if (field === 'txtLname') {
            //this.regRecord.lName = event.target.value;
            this.regRec['Last_Name__c'] = event.target.value;            
        }else if (field === 'txtEMail') {
            //this.regRecord.email = event.target.value;
            this.regRec['Email__c'] = event.target.value;            
        }else if (field === 'txtMobile') {
            //this.regRecord.mobile = event.target.value;
            this.regRec['Mobile__c'] = event.target.value;            
        }
    }

    

    saveRecord(event)
    {   
        saveRegRecord({reg : this.regRec})
        .then(result => {
            console.log(this.regRec)
            this.regRec = {};            
            window.console.log('result ===> '+result);
            alert('record inserted');
        })
        .catch(error => {
            this.error = error.message;
            console.log('error==>'+this.error);
            alert('record not inserted');
        });
    }

    cancelRecord(event) {
        this.val = 'Cancel button in clicked!!';
        alert('Cancel button in clicked!!');
    }

    editRecord(event){
        let recoId = event.target.getAttribute('data-id');
        console.log(recoId);
        editRegRecord({RecId:recoId})
        .then(result=>{
            console.log(result);
            this.regRec = result[0];
            console.log(this.regRec);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    deleteRecord(event){
        let recoId = event.target.getAttribute('data-id');
        alert(recoId);
    }
}