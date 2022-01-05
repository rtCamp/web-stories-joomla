<?php
/**
 * @package    Joomla.Modules
 * @subpackage mod_webstories
 *
 * @author     Google
 * @copyright  Copyright 2021 Google LLC
 * @license    Apache License 2.0
 * @link       https://opensource.google.com/
 */

// No direct access to this file
defined( '_JEXEC' ) or die;
use \Joomla\Component\Fields\Administrator\Helper\FieldsHelper;
JLoader::register( 'FieldsHelper', JPATH_ADMINISTRATOR . '/components/com_fields/helpers/fields.php' );
JModelLegacy::addIncludePath( JPATH_SITE . '/components/com_content/models', 'ContentModel' );

$id        = JFactory::getApplication()->input->get( 'id' );
$model     = JModelLegacy::getInstance( 'Article', 'ContentModel', [ 'ignore_request' => true ] );
$appParams = JFactory::getApplication()->getParams();
$model->setState( 'params', $appParams );
$item     = $model->getItem( $id );
$jcFields = FieldsHelper::getFields( 'com_content.article', $item, true );
$webstoryid;
foreach ( $jcFields as $jcField ) {
	if ( $jcField->name === 'webstories' ) {
		$webstoryid = $jcField->rawvalue[0];
	}
}
if ( empty( $webstoryid ) || $webstoryid === 'none' ) {
	return;
}

echo "<iframe id='15' style='height:600px;width:360px' src='http://localhost:88/joomla/index.php?option=com_webstories&view=Storyeditor&id=" . $webstoryid . "'></iframe>";
