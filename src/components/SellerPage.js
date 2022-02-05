import React , {useEffect} from 'react';
import axios from 'axios'

export default function SellerPage(props) {
  
  useEffect(()=>{

    let body ={whoReceived:props.sellerData.email}

    axios.get('http://localhost:5000/api/appointment/appointments', body).then((res)=>{

     console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })


  },[''])

  return <div>
   <h1 className="text-6xl">Seller</h1>

  </div>;
}
