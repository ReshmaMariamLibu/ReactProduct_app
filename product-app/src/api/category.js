import axios from 'axios';

export const getCategory = async () => {
    const url = `${import.meta.env.VITE_PRODUCT_URL}/category`
    return axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
//   export const postCategory = async (Data) =>{
//     const url = `${import.meta.env.VITE_PRODUCT_URL}/addcategory`
//     return axios.post(url,Data)
//     .then((res) => {
//         return res.data;
//     })
//     .catch((error) => {
//         throw error;
//     });
    
// }

export const postCategory = async (Data, successCb, errorCb) => {
    const url = `${import.meta.env.VITE_PRODUCT_URL}/addcategory`;
  
    return axios.post(url, Data)
      .then((response) => {
        if (successCb) successCb(response.data);
        return response.data;
      })
      .catch((error) => {
        if (errorCb) errorCb(error);
        throw error;
      });
  };
