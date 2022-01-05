<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  com_webstories
 *
 * @copyright   Copyright (C) 2021 John Smith. All rights reserved.
 * @license     GNU General Public License version 2; see LICENSE
 */
defined( '_JEXEC' ) or die;

use Joomla\CMS\Router\Route;
use Joomla\CMS\Factory;
use Joomla\CMS\WebAsset\WebAssetManager;
use Joomla\CMS\HTML\HTMLHelper;

$wa  = Factory::getApplication()->getDocument()->getWebAssetManager();
$app = Factory::getApplication();

$wa->useStyle( 'com_webstories.joomla-props-to-save' );
$wa->useStyle( 'com_webstories.joomla-props-to-save-rtl' );
$wa->useStyle( 'com_webstories.joomla-story-editor-rtl' );
$wa->useStyle( 'com_webstories.joomla-story-editor' );
$wa->useScript( 'com_webstories.get-story-props-to-save-shared' );
$wa->useScript( 'com_webstories.get-story-props-to-save' );
$wa->useScript( 'com_webstories.story-editor-js' );
$wa->useScript( 'com_webstories.vendor-shared-js' );
$wa->useScript( 'com_webstories.resize-observer' );

$id    = $_GET['id'];
$db    = Factory::getDbo();
$user  = Factory::getUser();
$query = $db->getQuery( true )
		->select( $db->qn( 'profile_value' ) )
		->from( $db->qn( '#__user_profiles' ) )
		->where( $db->qn( 'profile_key' ) . ' = "joomlatoken.token"' )
		->where( $db->qn( 'user_id' ) . ' = ' . $user->id );
$db->setQuery( $query );
$item       = $db->loadAssoc();
$tokenSeed  = $item['profile_value'];
$siteSecret = $app->get( 'secret' );

if ( empty( $siteSecret ) ) {
	return '';
}

$rawToken  = base64_decode( $tokenSeed );
$tokenHash = hash_hmac( 'sha256', $rawToken, $siteSecret );
$message   = base64_encode( "sha256:$user->id:$tokenHash" );

echo '<script type="text/javascript">
    var webStoriesEditorSettings = {"config":{
        "api":{
            "saveLink":"../api/index.php/v1/webstories/update",
            "getMedia":"../api/index.php/v1/webstories/",
            "saveMedia":"../api/index.php/v1/webstories/save_file",
            "getStoryById":"../api/index.php/v1/webstories/getSingle",
            "deleteMedia":"../api/index.php/v1/webstories/deleteMedia",
            "getUsers":"../api/index.php/v1/webstories/users",
        },
        "storyId": ' . $id . ',
        "allowedAudioTypes":["aac","m4a","m4b","mp3","oga","ogg","wav"],
        "allowedAudioMimeTypes":["audio/mpeg","audio/aac","audio/wav","audio/ogg"],
        "allowedFileTypes":["gif","jpe","jpeg","jpg","m4v","mp4","png","svg","svgz","webm","webp"],
        "allowedImageFileTypes":["gif","jpe","jpeg","jpg","png","webp"],
        "allowedImageMimeTypes":["image/webp","image/png","image/jpeg","image/gif"],
        "allowedMimeTypes":{
            "image": ["image/webp","image/png","image/jpeg","image/gif","image/svg+xml"],
            "audio": [],
            "video": ["video/mp4","video/webm"]
        },
        "allowedTranscodableMimeTypes":["video/3gpp","video/3gpp2","video/MP2T","video/mp4","video/mpeg","video/ogg","video/quicktime","video/webm","video/x-flv","video/x-h261",
            "video/x-h263","video/x-m4v","video/x-matroska","video/x-mjpeg","video/x-ms-asf","video/x-msvideo","video/x-nut"],
        "autoSaveInterval": 60,
        "cdnURL": "https://wp.stories.google/static/main/",
        "ffmpegCoreUrl": "https://wp.stories.google/static/main/js/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
        "token":"' . $message . '",
        "userId":' . $user->id . ',
        "capabilities": {
            "hasUploadMediaAction": true,
            "canManageSettings":true,
        },
    }}
</script>';

echo HTMLHelper::_(
	'bootstrap.renderModal',
	'mediaModal',
	[
		'backdrop' => 'static',
		'title'    => 'Upload Media',
		'footer'   => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-button">Close</button>',
	],
	'
        <form>
            <div style="display:flex;flex-direction:column">
                <div class="input-group">
                    <input type="file" onchange="embedPreview(this)" class="form-control" id="file-input-button" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                    <button class="btn btn-outline-secondary" onclick="submitImages()" type="button" id="successButton">Upload</button>
                </div>
                <div id="mediaCarousel">
                </div>
            </div>
        </form>
    ',
);

echo HTMLHelper::_(
	'bootstrap.renderModal',
	'posterModal',
	[
		'backdrop' => 'static',
		'title'    => 'Select as poster image',
		'footer'   => '<button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="insertPoster()" id="close-button">Insert</button>',
	],
	'
        <form>
            <div id="posterCarousel" style="display:flex;flex-direction:row;overflow:auto">

            </div>
        </form>
    ',
);
?>
<script type="text/javascript">
	document.body.className += ' edit-story js';
</script>
<script type="text/javascript">
	window.onload = function(){
		document.getElementById('wrapper').classList.replace('open', 'closed');
		document.getElementById('subhead-container').remove();
		document.getElementById('content').style.padding='0';
	}
</script>
<div class="app">
		<div id="web-stories-editor" class="web-stories-editor-app-container hide-if-no-js">
			<h1 class="loading-message align-center">Please wait...</h1>
		</div>
</div>
