import { FetchError } from './fetch-error';

const getRequestConfig = (init?: RequestInit) => ({
  ...init,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchJSON = async (input: RequestInfo, init?: RequestInit) => {
  const response: any = await fetch(input, getRequestConfig(init));

  const isJSONResponse =
    response.headers.get('Content-Type').indexOf('application/json') !== -1;
  let responseData = response.statusText;

  if (isJSONResponse) {
    responseData = await response.json();
  }

  if (response.status !== 200) {
    // @ts-ignore
    throw new FetchError(responseData.message || responseData, responseData);
  }
  return responseData;
};
