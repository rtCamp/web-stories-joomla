export function getPublisherLogos(apiPath) {
    return Promise.resolve([{ url: '' }]);
}
export function addPublisherLogo(apiPath, id) {
    return Promise.resolve([{
        active:true,
        id:123,
        title:'sometitle.jpeg',
        url:''
      }]);
  }
  