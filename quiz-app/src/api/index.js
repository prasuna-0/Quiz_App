import axios from 'axios'

export const BASE_URL ='http://localhost:5012/';
export const ENDPOINTS={
    participants:'participants',
    questions:'questions',
    getanswers:'Questions/GetAnswers'
}
export const createAPIEndpoint=endpoint =>{
    let url=BASE_URL+'api/'+endpoint+'/';
    return{
        fetch:()=>axios.get(url),
        fetchById:id=>axios.get(url+id),
        post:newRecord =>axios.post(url,newRecord),
        put:(id,updatedRecord)=>axios.put(url+id,updatedRecord),
        delete:id=>axios.delete(url+id),
    }    
}