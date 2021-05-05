export function processResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return {
      statusCode: 0,
      data: response.data,
    };
  }
  return {
    statusCode: 1,
    error: response.data && response.data.error,
  };
}

export function processError(error) {
  // Server fatal error
  if (error.response && error.response.status === 500) {
    return {
      statusCode: 4,
      error: 'server_error',
    };
  }

  // Action not allowed error
  if (error.response && error.response.status === 403) {
    return {
      statusCode: 4,
      error:
        error.response.data.error === 'blocked_temporarily' || error.response.data.error === 'blocked_permanently'
          ? error.response.data.error
          : 'auth_error',
    };
  }

  // Non critical request error
  if (error.response) {
    if (error.response.data.errors && error.response.data.errors.length) {
      return {
        statusCode: 1,
        error: error.response.data.errors[0],
      };
    }
    return {
      statusCode: 1,
      error:
        error.response.data.error && error.response.data.error.split
          ? error.response.data.error.split(' ')[0]
          : 'request_error',
    };
  } else if (error.request) {
    // Connection error
    return {
      statusCode: 2,
      error: 'connection_error',
    };
  }

  // Unknown error
  return {
    statusCode: 3,
    error: error.message && error.message.split ? error.message.split(' ')[0] : 'unknown_error',
  };
}

export function privateRequestParams(token, additional = {}) {
  return {
    headers: {
      Authorization: 'Token ' + token,
      'Content-Type': 'application/json',
    },
    ...additional,
  };
}

export function publicRequestParams(additional = {}) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    ...additional,
  };
}

export function imageParams(token) {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${token}`,
    },
  };
}
