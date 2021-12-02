import axios from 'axios';
export const getMedia = async (config,mediaType) =>{
  console.log('reached here');
  let response = await axios({
    method: 'GET',
    url:
      '../api/index.php/v1/webstories/' +
      (mediaType === '' || mediaType === 'LOCAL_MEDIA_TYPE_ALL'
        ? 'getall'
        : mediaType === 'image'
        ? 'getimages'
        : 'getvideos'),
    headers: {
      Authorization:
        'Bearer '+config.token,
    },
  });
  const data = response.data;
  const headers = {
    ...response.headers,
    totalItems: response.headers['x-wp-total'],
    totalPages: response.headers['x-wp-totalpages'],
  };
  return { data, headers };
}
export const saveMedia = async (config,formData) =>{
    let response = await axios({
        method: 'POST',
        url: '../api/index.php/v1/webstories/saveimage',
        data: formData,
        headers: {
          Authorization:
            'Bearer '+config.token,
        },
      });
    return response;
}