export const headers = (getState = null) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //If token, add to headers config
  if (getState) {
    //Get token from state
    const token = getState().auth.token;
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
