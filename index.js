import { API } from '@aws-amplify/api';
import config from '../src/aws-exports.js';
import { listDesignations } from './graphql/queries.js';
import { createDesignation } from './graphql/mutations.js';

// after your imports
API.configure(config);

// later down in your code
async function list() {
    const response = await API.graphql({
        query: listDesignations,
        variables: {
            // Optional: If you want to add any filters or pagination variables, you can define them here.
            // Example: filter: { id: { eq: 'someId' } }, limit: 10, nextToken: null
        },
    });
    if (response.data && response.data.listDesignations) {
        const designationsList = response.data.listDesignations.items;
        console.log('Designations List:');
        designationsList.forEach((designation) => {
            console.log(designation);
        });
    } else {
        console.log('No data received or invalid response structure.');
    }
}

async function create() {
    try {
      const designationToInsert = {
        id: '6',
        designation: 'Project Manager',
        code: 'PM',
      };
  
      // Perform the GraphQL mutation using API.graphql
      const response = await API.graphql({
        query: createDesignation,
        variables: { input: designationToInsert },
      });
  
      // Access the newly created designation data from the response
      const newDesignation = response.data.createDesignation;
  
      console.log('Newly created designation:', newDesignation);
  
      // Return the newly created designation if needed
      return newDesignation;
    } catch (error) {
      console.error('Error creating designation:', error);
      // Handle errors as needed
    }
  }
  
  // Call the function to insert data
  list();

