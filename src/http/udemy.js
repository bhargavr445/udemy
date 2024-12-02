import axios from "axios";

export const fetchData = async () => {
      const response = await axios.get('http://localhost:3010/api/fetchCreatedCourses');
      if(response.status !== 200) {
        return response;
      }
      response.data.data.sort((p,c) => p.price > c.price ? -1 : 1 );
      return response.data;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('Data Fetched...');
    //     }, 3000);
    // }
    // );

};