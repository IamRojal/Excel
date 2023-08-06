// import { list } from "./src/country.js";

// list();
import { API } from '@aws-amplify/api';
import config from './country/src/aws-exports.js';
import { listCountries } from './country/src/graphql/queries.js';
API.configure(config);
exports.handler = async function (event) {
    console.log('hai');
    let response = await API.graphql({
        query: listCountries,
        variables: {
            // Optional: If you want to add any filters or pagination variables, you can define them here.
            // Example: filter: { id: { eq: 'someId' } }, limit: 10, nextToken: null
        },
    })
    return { message: 'success' };
};