import { FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

export const MODAL_TYPE_ADD = 1 ; 
export const MODAT_TYPE_EDIT = 0 ; 
export function  convertToFormData(formGroup :FormGroup) :FormData {
    let formData : FormData = new FormData;
    Object.keys(formGroup.value).forEach(key => {
        if(formGroup.value[key] != null )
        formData.append(key ,formGroup.value[key]);
    });
    return formData ;
}

export function loadJsFile(url , document) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  export async function getStaticMessages(translate : TranslateService) {
     let res = await  translate.get(["delete_title" , "delete_text", "confirmButtonText" , "cancelButtonText" , "success_delete" ,"suceess_text" , "Cancelled_delete" , "Cancelled_text"]).toPromise() ;
     
     return res ; 
  }