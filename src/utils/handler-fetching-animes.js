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