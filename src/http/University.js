import axios from "axios";

export async function fetchUniversities({selectedCountry, signal}) {
  let url = 'http://localhost:3010/api/universities';
  if(selectedCountry) {
   url =  `${url}?alphaTwoCode=${selectedCountry}`
  }
  
    try {
      const response = await axios(url, {signal});
      return response.data;
    } catch (error) {
        return error;
    }
}

export async function fetchCountrys({signal}) {
  let url = 'http://localhost:3010/api/countrys';
  try {
    const response = await axios(url, {signal});
      return response.data;
  } catch (error) {
    return error;
  }
}