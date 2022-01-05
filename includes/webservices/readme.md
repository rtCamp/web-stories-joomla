# Webservices

---

### Folder `webservices`

#### This is a plugin. Plugins are more advanced extensions and are in essence event handlers

- This folder creates the REST API endpoints for: `saveLink`, `getMedia`,`saveMedia`,`deleteStory`,`getStoryById`.
- Endpoints for certain protocol like `GET|POST|PUT|DELETE` can be created separately. If `createCRUDRoutes` is used then it will automatically create `GET|POST|PUT|DELETE`.
- ROUTES:
    - `saveLink`| `POST` | it will be used to save/update the story.
    - `delete`| `DELETE` | it will be used to delete a story.
    - `getStoryById`| `GET` | it will be used to get the story.
    - `getMedia`| `GET` | it will be used to get all the media.
    - `saveMedia`| `POST` | it will be used to save a local media upload.
