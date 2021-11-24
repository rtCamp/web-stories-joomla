export const getMedia = async () =>{
    let response = await axios({
        method: 'GET',
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/getimages',
        headers: {
          Authorization:
            'Bearer c2hhMjU2OjIxNTo4YWEzMzIyOTgwYjJmY2YwYjY1NTFiZDJjNTJiN2JjNzhiYzQzZGZlYWY2NjFmOGM4OTVmN2FhOGNlYzJkMGVk',
        },
      });
    response = Promise.resolve(response);
    return response;
}
export const saveMedia = async (formData) =>{
    let response = await axios({
        method: 'POST',
        url: 'http://localhost:88/joomla-cms/api/index.php/v1/webstories/saveimage',
        data: formData,
        headers: {
          Authorization:
            'Bearer c2hhMjU2OjIxNTo4YWEzMzIyOTgwYjJmY2YwYjY1NTFiZDJjNTJiN2JjNzhiYzQzZGZlYWY2NjFmOGM4OTVmN2FhOGNlYzJkMGVk',
        },
      });
    return response;
}