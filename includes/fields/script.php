<?php
// No direct access to this file
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 *
 * @package     Joomla.Plugin
 * @subpackage  Fields
 *
 * @author     Google
 * @copyright  Copyright 2021 Google LLC
 * @license    Apache License 2.0
 * @link       https://opensource.google.com/
 */
use Joomla\CMS\Factory;
class PlgfieldswebstoriesInstallerScript {

	/**
	 * This method is called after a component is installed.
	 *
	 * @param  \stdClass $parent - Parent object calling this method.
	 *
	 * @return void
	 */
	public function install( $parent ) {
		$db    = Factory::getDbo();
		$query = $db->getQuery( true );
		$query = "select * from #__fields where label = 'webstories'";
		$db->setQuery( $query );
		$db->execute();
		$result = $db->loadAssoc();
		if ( empty( $result ) ) {
			$query = "INSERT INTO `#__fields`(`modified_time`,`created_time`,`context`,`title`,`params`,`description`, `name`, `label`, `type`, `state`, `required`, `fieldparams`, `access`) VALUES 
            ('" . date( 'Y-m-d H:i:s' ) . "','" . date( 'Y-m-d H:i:s' ) . "','com_content.article','webstories','','','webstories','webstories','webstories',1,0,'" . json_encode( [ 'multiple' => 0 ] ) . "',1)";
			$db->setQuery( $query );
			$result = $db->execute();
		}
		$query = "UPDATE `#__extensions` set enabled = 1 where element='webstories' AND type = 'plugin'";
		$db->setQuery( $query );
		$db->execute();
	}

	/**
	 * This method is called after a component is uninstalled.
	 *
	 * @param  \stdClass $parent - Parent object calling this method.
	 *
	 * @return void
	 */
	public function uninstall( $parent ) {
	}

	/**
	 * This method is called after a component is updated.
	 *
	 * @param  \stdClass $parent - Parent object calling object.
	 *
	 * @return void
	 */
	public function update( $parent ) {
		$db    = Factory::getDbo();
		$query = $db->getQuery( true );
		$query = "select * from #__fields where label = 'webstories'";
		$db->setQuery( $query );
		$db->execute();
		$result = $db->loadAssoc();
		if ( empty( $result ) ) {
			$query = "INSERT INTO `#__fields`(`modified_time`,`created_time`,`context`,`title`,`params`,`description`, `name`, `label`, `type`, `state`, `required`, `fieldparams`, `access`) VALUES 
            ('" . date( 'Y-m-d H:i:s' ) . "','" . date( 'Y-m-d H:i:s' ) . "','com_content.article','webstories','','','webstories','webstories','webstories',1,0,'" . json_encode( [ 'multiple' => 0 ] ) . "',1)";
			$db->setQuery( $query );
			$result = $db->execute();
		}
		$query = "UPDATE `#__extensions` set enabled = 1 where element='webstories' AND type = 'plugin'";
		$db->setQuery( $query );
		$db->execute();
	}

	/**
	 * Runs just before any installation action is performed on the component.
	 * Verifications and pre-requisites should run in this function.
	 *
	 * @param  string    $type   - Type of PreFlight action. Possible values are:
	 *                           - * install
	 *                           - * update
	 *                           - * discover_install
	 * @param  \stdClass $parent - Parent object calling object.
	 *
	 * @return void
	 */
	public function preflight( $type, $parent ) {
	}

	/**
	 * Runs right after any installation action is performed on the component.
	 *
	 * @param  string    $type   - Type of PostFlight action. Possible values are:
	 *                           - * install
	 *                           - * update
	 *                           - * discover_install
	 * @param  \stdClass $parent - Parent object calling object.
	 *
	 * @return void
	 */
	function postflight( $type, $parent ) {
	}
}
