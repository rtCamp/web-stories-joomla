# Webstories

---

### This is a component. component are those extensions which have a site part and a admin part

    Site part shows the `webstory` in lightbox and admin part shows the `dashboard` and the `story-editor`.

- This folder contains the important parts required to show the `story-editor` and the `dashboard`.
- After installing the folder you can see a menu component named `Webstories` under `Components` menu.
- Click on `webstories` it will open a prototype dashboard which will show all the webstories and an option to create a web story.

### Folder `api`

- This folder contains varous functions which will help in outputting the response to the `REST request`.

### Folder `media`

- media folder will contain the generated `CSS` and `JS` files which will help in rendering the story editor and the dashboard.
- all the assets which need to be displayed in the frontend have to be written in `joomla.asset.json`.
- for script/styles add the following code for each file code:

```
{
    "name": "name for reference",
    "type": "type of file [script/style]",
    "uri": "path for the file"
},
```

-  `useScript()` for adding script to the page and `useStyle()` to add stylesheet to the page.
