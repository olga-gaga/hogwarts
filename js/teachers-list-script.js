import {createTable} from './style-loading.js';
const url = 'https://api-euwest.graphcms.com/v1/ck0djr5sr0g7f01d0ayv93gt1/master';
const teachersQuery = `
      {
        teachers (where:{}){
          firstName
          lastName
          img {
            url
          }
        }
      }`;
let teachers;
axios.post(url, {query: teachersQuery})
.then(response => {
    teachers = response.data.data.teachers;
    createTable("teachers", teachers);
});

