import { URL_API_AYOTAKU } from '../utils/secrets.json';

export async function handlerFetchingRecommendAnime(number_max) {
  const headersRecommend = new Headers();
  headersRecommend.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: headersRecommend,
    redirect: 'follow',
  };

  try {
    const responseFetching = await fetch(`${URL_API_AYOTAKU}/user/api/anime/recommend?max_recommend=${number_max}`, requestOptions);
    const returnData = await responseFetching.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerFetchingLastUpdateSeason({ year = null, season = null, limit = null } = {}) {
  const headerLastUpdate = new Headers();
  headerLastUpdate.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: headerLastUpdate,
    redirect: 'follow'
  };

  try {
    const urlFilter = (!year && !season) ? `/user/api/anime/last?limit=${limit}` : `/user/api/anime/last?filterYear=${year}&filterSeason=${season}&limit=${limit}`;
    const responseFetching = await fetch(`${URL_API_AYOTAKU}${urlFilter}`)
    const returnData = await responseFetching.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err
  }
}

export async function handlerFetchingSuggestedAnime() {
  const headerSuggestedAnime = new Headers();
  headerSuggestedAnime.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: headerSuggestedAnime,
    redirect: 'follow',
  };

  try {
    const responseFetching = await fetch(`${URL_API_AYOTAKU}/user/api/anime/suggest`, requestOptions);
    const returnData = await responseFetching.json();
    if (returnData.status === 'error') return { status: 'error', message: returnData.message };
    
    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}