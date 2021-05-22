
import axios from "axios";
import { SERVER_URL,ROLL_NUMBER } from '../utils/constants';


export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/dummy.do?`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: { name: name },
    }
  );
}


export function addInvo(user) {
  console.log("ser", user)
  return axios.post(`${SERVER_URL}AddData`, {}, {
    params: user
  })
 
}
 

export function editInvo(user) {
  return axios.post(`${SERVER_URL}EditData`, {}, {
    params: user
  })
 
}
 
export function deleteInvo(user) {
  let doc_id = {doc_id: user.toString()}
  return axios.post(`${SERVER_URL}DeleteData`, {}, {
    params: doc_id
  })
}


// export function searchInvo(data) {
//   let invoice_no = {invoice_no: data.toString()}
//   return axios.get(`${SERVER_URL}GetFormData?invoice_no=${data}`, {}, {
//     params: invoice_no
//   })
// }

export function getData(data) {

  return axios.get(`${SERVER_URL}ViewCorrespondance?doc_id=${data}`, {}, {
    params: data,
  })
}

// export function getDataForCorrespondance(data) {
//   return axios.get(`${SERVER_URL}ViewCorrespondance?doc_id=${data}`, {}, {
//     params: data
//   })
// }


// export function prediction(tableData) {
//   console.log('predict', tableData);
//   console.log({
//     "data": tableData,
//     "roll_number": 1805693
//   }, "hfbjhbdfjh")
//   return axios.post(`http://127.0.0.1:5000/predict`, {}, {
//     header: {
//       "Access-Control-Allow-Origin": "*",
//       // mode: 'no-cors'
//     },
//     params: {
//       "data": tableData,
//       "roll_number": 1805693
//     }
    
//   },
   
//   )
// }

export function prediction(data) {
  let data1 = JSON.stringify(data);

  return axios.post(
    'http://127.0.0.1:5000/predict', {
    // {}, {
    
    // headers: { 'Content-Type' : 'application/json'},
    //       headers:{
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Accept': 'application/json'},
    // // },
    //       params: {
    //         id: "1805693",
    //         data : data,
    //       },
    //     })
    //     .then(response => {
    //       console.log(response.data);
    //       return response.data;
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //     params: {
    //       id: "1805693",
    //       data : data,
    
    //     }
    // }
    headers: {
      'Content-Type': 'application/json'
      },
      id: "1805693",
      data: data1,
  },
  )
}