'use client'; // 'use server'; // Server Actions are not supported with static export.

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Config

const API_BASE_URL = 'https://67862af6f80b78923aa5ace3.mockapi.io/api/v1';
const TIME_DELAY = 2000;

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Interfaces

export interface IDataRequest {
  source: string;
  method: 'GET' | 'MOCK';
};

export interface IDocument {
  [key:string]: any;
};

export interface IDataResponseCollection {
  data: IDocument[];
  success?: boolean;
  error?: any;
};

export interface IDataResponseDocument {
  data: IDocument;
  success?: boolean;
  error?: any;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Data Fetchers

export const dataRequestCollection = async (
  request:IDataRequest
):Promise<IDataResponseCollection> => {
  const {source, method} = request;
  const fetchURL = API_BASE_URL + source;
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const fetchProcessor = async (
    response: any
  ):Promise<IDataResponseCollection> => {
    if (response.ok) {
      const data = await response.json();
      return { data, success: true };
    }
    return { data: [], success: false };
  };

  let fetchResponse;

  try {
    fetchResponse = await
      fetch(fetchURL, fetchOptions)
      .then(fetchProcessor);
  } catch(error) {
    fetchResponse = { data: [], error };
  }

  return fetchResponse;
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ App Shortcuts

export async function fetchDataBalance():Promise<IDataResponseCollection> {
  const response = await dataRequestCollection({
    source: '/balance',
    method: 'GET',
  });
  return response;
};

export async function fetchDataNotFound():Promise<IDataResponseCollection> {
  const response = await dataRequestCollection({
    source: '/not-found',
    method: 'GET',
  });
  return response;
};

export async function fetchDataCurrenciesMapping():Promise<IDataResponseDocument> {
  // Mocked processing ...
  await new Promise((resolve) => {
    setTimeout(resolve, TIME_DELAY);
  });
  // ... ready!
  return {data: currenciesMapping, success: true};
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ Hardcoded Data

const currenciesMapping = {
  "1": "AUD",
  "2": "RSD",
  "3": "CHF",
  "4": "JPY",
  "5": "EUR",
  "6": "USD",
  "7": "DZD",
  "8": "ARS",
  "9": "AZN",
  "10": "BRL",
  "11": "CNY",
  "12": "GEL",
  "13": "INR",
  "14": "LVL",
  "15": "OMR",
  "16": "CUP",
  "17": "ZAR",
  "18": "ZWD",
  "19": "QAR",
  "20": "PLN",
  "21": "GBP",
  "22": "CAD",
  "23": "SEK",
  "24": "PHP",
  "25": "IDR",
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ save-dev

// not used
const HARDCODED_RESPONSE_BALANCE = [
  {"id":"1","amount":"452.67"},
  {"id":"2","amount":"895.34"},
  {"id":"4","amount":"678.90"},
  {"id":"5","amount":"234.56"},
  {"id":"6","amount":"789.12"},
  {"id":"7","amount":"345.67"},
  {"id":"8","amount":"456.78"},
  {"id":"9","amount":"987.65"},
  {"id":"10","amount":"321.45"},
  {"id":"11","amount":"543.21"},
  {"id":"12","amount":"876.54"},
  {"id":"13","amount":"234.89"},
  {"id":"14","amount":"675.43"},
  {"id":"15","amount":"432.10"},
  {"id":"16","amount":"567.89"},
  {"id":"17","amount":"345.12"},
  {"id":"18","amount":"123.98"},
  {"id":"19","amount":"765.43"},
  {"id":"20","amount":"654.32"},
  {"id":"21","amount":"876.21"},
  {"id":"22","amount":"456.12"},
  {"id":"23","amount":"987.32"},
  {"id":"24","amount":"123.76"}
];

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ eof
