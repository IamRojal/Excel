// top of file
import { API } from '@aws-amplify/api'
import config from './src/aws-exports.js'
import { listCountries } from './src/graphql/queries.js'
import { createCountry } from './src/graphql/mutations.js'

// after your imports
API.configure(config)

export const handler = async(event) => {
     try {
   const requestBody = event?.body?JSON.parse(event.body):'nodata';
   
   if(requestBody.type=='add'){
       const variables = {
      input: {
        ...requestBody.data
      },
    };
        const response = await API.graphql({query: createCountry,variables})
        console.log(response);
        return {status:'200',data:'successssss',requestBody:requestBody};
   }

    // return {status:'200eee',data:{event:event,abc:abc}};
   
        const response = await API.graphql({      query: listCountries,   })
        console.log(response);
        return {status:'200',data:response?.data?.listCountries?.items||[],requestBody:requestBody};
    }
    catch (e) {
        return {status:'500',error:e,data:[]};
    }
};

// later down in your code
// async function list() {
//    const response = await API.graphql({
//       query: listCountries,
//    })
//    console.log(response)
// }
// list()