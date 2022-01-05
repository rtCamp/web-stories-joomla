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
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Factory;
use Joomla\CMS\WebAsset\WebAssetManager;

$wa  = Factory::getApplication()->getDocument()->getWebAssetManager();
$app = Factory::getApplication();
$wa->useStyle( 'com_webstories.joomla-props-to-save' );
$wa->useStyle( 'com_webstories.joomla-props-to-save-rtl' );
$wa->useStyle( 'com_webstories.joomla-story-editor-rtl' );
$wa->useStyle( 'com_webstories.joomla-story-editor' );

$wa->useScript( 'com_webstories.dashboard' );
$wa->useScript( 'com_webstories.vendors-dashboard' );
$wa->useScript( 'com_webstories.resize-observer' );
$wa->useScript( 'com_webstories.vendor-shared-js' );
$wa->useScript( 'com_webstories.get-story-props-to-save-shared' );
$wa->useScript( 'com_webstories.get-story-props-to-save' );
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
if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {   
	$url = 'https://';   
} else {
	$url = 'http://';
} 
$newStoryUrl = $url . $_SERVER['HTTP_HOST'] . '/joomla/administrator/index.php?option=com_webstories&view=storyeditor&create_new=yes';
echo '<script type="text/javascript">
var dashboardSettings = {
    "config":{
        "token":"' . $message . '",
        "api":{
            "fetchStories":"../api/index.php/v1/webstories",
            "duplicateStory":"../api/index.php/v1/webstories/duplicate",
            "updateStory":"../api/index.php/v1/webstories/rename",
            "trashStory":"../api/index.php/v1/webstories/delete",
            "createStoryFromTemplate":"../api/index.php/v1/webstories/create_story_from_template",
        },
        "allowedImageMimeTypes":["image/webp","image/png","image/jpeg","image/gif"],
        "capabilities":{
            "canManageSettings": true,
            "canUploadFiles": true
        },
        "cdnURL":"https://wp.stories.google/static/main/",
        "newStoryURL":"' . $newStoryUrl . '",
        "userId":' . $user->id . '
    }
};
</script>';
?>
<script type="text/javascript">
	window.onload = function(){
		document.getElementById('wrapper').classList.replace('open', 'closed');
		document.getElementById('subhead-container').remove();
		document.getElementById('content').style.padding='0';
	}
</script>
<script type='text/javascript'>
	document.body.className += ' js web-story_page_stories-dashboard';
</script>
<div class="app">
<div class="web-stories-wp">
	<div id="web-stories-dashboard" class="web-stories-dashboard-app-container hide-if-no-js">
	</div>
</div>
</div>

