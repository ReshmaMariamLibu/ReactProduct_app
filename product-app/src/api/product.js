import axios from 'axios';

export const getProducts = async () => {
    const url = `${import.meta.env.VITE_PRODUCT_URL}/product`
    return axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
//   export const postProduct = async (productData) =>{
//     const url = `${import.meta.env.VITE_PRODUCT_URL}/add_product`
//     return axios.post(url,productData)
//     .then((res) => {
//         return res.data;
//     })
//     .catch((error) => {
//         throw error;
//     });
    
// }

export const postProduct = async (productData, successCb, errorCb) => {
    const url = `${import.meta.env.VITE_PRODUCT_URL}/add_product`;
  
    return axios.post(url, productData)
      .then((response) => {
        if (successCb) successCb(response.data);
        return response.data;
      })
      .catch((error) => {
        if (errorCb) errorCb(error);
        throw error;
      });
  };

export const getProductDetails = async (productId) => {
    const url = `${import.meta.env.VITE_PRODUCT_URL}/product/${productId}`
    return axios.get(url)
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        throw error;
    });
};
  
  