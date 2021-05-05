const productionConfig = {
    BASE_API_URL: 'https://restoic-app-19339.botics.co',
    DOMAIN_URL: 'https://showcasing.herokuapp.com',
  };
  
  const devConfig = {
    BASE_API_URL: 'https://restoic-app-19339.botics.co',
    DOMAIN_URL: 'http://localhost:8000',
  };
  
  export const {
    BASE_API_URL,
    DOMAIN_URL,
  } = process.env.NODE_ENV === 'production' ? productionConfig : devConfig;