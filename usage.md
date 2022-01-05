# Web stories for Joomla CMS

For curious minds you can take a look here to explore the source code for [Joomla Webstories](https://github.com/amovar18/web-stories-joomla-javascript)
---

## Prerequisites for embedding webstories in joomla

1. Need [XAMPP for linux](https://www.apachefriends.org/download.html),[WAMP for Windows](https://www.wampserver.com/en/) or [MAMP for OSX](https://www.mamp.info/en/downloads/) for your system to run joomla.
2. Need to have Joomla on the system. [Joomla](https://downloads.joomla.org/).
3. Your joomla site should be setup.
4. Run the commands `npm ci` and `npm run workflow-build-plugin` after cloning this repository.

## Steps to make it work

1. Login as admin.
2. Go to `System` menu-> select `extensions` under install.
3. Either drag and drop the file or select the File named as `Finaljoomla-web-stories.zip` from the build folder.
4. After Installation click on `User Menu` in the header and select `Edit account` in the dropdown.
5. Just click on `save and close` button in the `User:Edit Profile` page.
6. Now go back to the administrator screen.
7. Go to `Content` menu->Select the `Site Modules` menu. Then Click on `+ New` from the header.
8. Select the Webstories Module type.
9. Now give your module any unique name for your recoginition and then click on `save and close`.
10. To create a story click on `Component` menu and then Click on `Webstories`. You will be directed to the dashboard.
11. Create a new story using either `Create New Story` or using an exisiting set of templates.
12. After saving the story. Select and article from the `Content` menu and then go to `Fields` tab in article edit mode which is in the same level as of `Content`. Select the story that you want to display from the dropdown.
13. Now in the `Content` tab in article edit page place your cursor wherever you want in the text area, find the dropdown written as CMS Content.
14. Select module from the drop down. Now in the module selection page select the module you created in `step 9`.
15. Now click on `save` and then click on `preview` and `voila` you have your web story embedded in your article.

---
