import axios from "axios";
import { getStorySaveData } from "./utils/getStorySaveData";
export const saveStoryById = async (config, story) => {
  const storySaveData = getStorySaveData(story);
  const { storyId } = storySaveData;
  const { data } = await axios({
    method: 'POST',
    url: config.api.saveLink,
    headers: {
      Authorization:
        'Bearer c2hhMjU2OjIxNTo4YWEzMzIyOTgwYjJmY2YwYjY1NTFiZDJjNTJiN2JjNzhiYzQzZGZlYWY2NjFmOGM4OTVmN2FhOGNlYzJkMGVk',
    },
    data: {
      id: storyId,
      markup: story?.content,
      post_content_filtered: storySaveData?.story_data,
      title: story?.title,
      created_by: 'wordpress',
      post_date: new Date(story?.date)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      modified_date: new Date(story?.date)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' '),
      published: 1,
    },
  });
  return data;
}
export const getStoryById = async (config, id) => {
  const { data } = await axios({
    method: 'GET',
    url: config.api.getStoryById + id,
    headers: {
      Authorization:
        'Bearer c2hhMjU2OjIxNTo4YWEzMzIyOTgwYjJmY2YwYjY1NTFiZDJjNTJiN2JjNzhiYzQzZGZlYWY2NjFmOGM4OTVmN2FhOGNlYzJkMGVk',
    },
  });
  return Promise.resolve(data);

}