import { getCookie } from './cookies';

const baseURL = 'http://localhost:5000';

export const apiClient = async (url, method, body = null, tokenName = '') => {
  const accessToken = getCookie('access_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (tokenName) {
    defaultHeaders['Authorization'] = `Bearer${getCookie(tokenName)}`;
  } else {
    defaultHeaders['Authorization'] = `Bearer ${accessToken}`;
  }
  let config;

  if (!body || body === null) {
    config = {
      method: method,
      headers: {
        ...defaultHeaders,
      },
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(`${baseURL}${url}`, config);
  return await response.json();
};

// user authentication .......................................
//Auth APIs

apiClient.login = async (payload) =>
  await apiClient('/uers/login', 'POST', payload);

apiClient.signup = async (payload) =>
  await apiClient('/uers/signup', 'POST', payload);

apiClient.getProducts = async (payload) => {
  return await apiClient('/manageStock/getProducts', 'GET', payload);
};

apiClient.getAllInventory = async (payload) => {
  return await apiClient('/manageStock/getAllInventory', 'GET', payload);
};

apiClient.getAllUsers = async (payload) => {
  return await apiClient('/manageStock/getAllUsers', 'GET', payload);
};

apiClient.addProduct = async (payload) => {
  return await apiClient('/manageStock/addProduct', 'POST', payload);
};

apiClient.productEntry = async (payload) => {
  return await apiClient('/manageStock/productEntry', 'POST', payload);
};

apiClient.productExit = async (payload) => {
  return await apiClient('/manageStock/productExit', 'POST', payload);
};
