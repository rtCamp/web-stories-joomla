<?php
/**
 * @package    Joomla.Fields
 *
 * @author     Google
 * @copyright  Copyright 2021 Google LLC
 * @license    Apache License 2.0
 * @link       https://opensource.google.com/
 */

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
defined( '_JEXEC' ) or die( 'Restricted access' );
use Joomla\CMS\Form\FormHelper;
FormHelper::loadFieldClass( 'list' );

// The class name must always be the same as the filename (in camel case)
class JFormFieldWebstories extends JFormFieldList {

	// The field class must know its own type through the variable $type.
	protected $type = 'Webstories';

	public function getLabel() {
		return '<span>Select a web story</span>';
	}

	public function getOptions() {
		$app   = JFactory::getApplication();
		$db    = JFactory::getDbo();
		$query = $db->getQuery( true );
		$query->select( $db->quoteName( [ 'id', 'title', 'published' ] ) )->from( '#__webstories' );
		$rows      = $db->setQuery( $query )->loadObjectlist();
		$stories[] = JHTML::_( 'select.option', 'none', '--None--' );
		foreach ( $rows as $row ) {
			if ( $row->published === 1 ) {
				$stories[] = JHTML::_( 'select.option', $row->id, $row->id . ' (' . $row->title . ')' );
			}
		}
		$options = array_merge( parent::getOptions(), $stories );
		return $options;
	}
}
