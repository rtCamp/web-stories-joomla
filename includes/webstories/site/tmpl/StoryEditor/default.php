<?php

/**
 * @package     Joomla.Administrator
 * @subpackage  com_webstories
 *
 * @copyright   Copyright (C) 2021 John Smith. All rights reserved.
 * @license     GNU General Public License version 2; see LICENSE
 */
defined( '_JEXEC' ) or die;
use Joomla\CMS\Factory;
if ( ! isset( $_GET['id'] ) && empty( $_GET['id'] ) ) {
	return;
}
$db    = Factory::getDbo();
$query = $db->getQuery( true );
$query
	->select( $db->quoteName( 'markup' ) )
	->from( $db->quoteName( '#__webstories' ) )
	->where( $db->quoteName( 'id' ) . '=' . $_GET['id'] );
$db->setQuery( $query );
$item = $db->loadAssoc();

?>
<script type="text/javascript">
	window.onload=function(){
	document.body.className.replace('has-sidebar-right','')
	const header = document.getElementsByClassName('header container-header full-width');
	const footer = document.getElementsByClassName('container-footer footer full-width');
	header[0] ? header[0].remove():null;
	footer[0] ? footer[0].remove():null;
	const left = document.getElementsByClassName('grid-child container-sidebar-left');
	const bottom = document.getElementsByClassName('grid-child container-bottom-a');
	const right = document.getElementsByClassName('grid-child container-sidebar-right');
		right[0] ? right[0].remove(): null;
		left[0] ? left[0].remove():null;
		bottom[0] ? bottom[0].remove():null;
	}
</script>
<?php var_dump( $item['markup'] ); ?>
