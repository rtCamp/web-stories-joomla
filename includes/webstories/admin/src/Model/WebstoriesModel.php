<?php
declare(strict_types=1);
/**
 * @package    Joomla.Administrator
 * @subpackage com_webstories
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

namespace Google\Component\WebStories\Administrator\Model;

defined( '_JEXEC' ) or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\MVC\Model\ListModel;
use Joomla\Utilities\ArrayHelper;

class WebstoriesModel extends ListModel {

	/**
	 * Constructor.
	 *
	 * @param   array $config  An optional associative array of configuration settings.
	 *
	 * @see     \JControllerLegacy
	 * @since  0.1.0
	 */
	public function __construct( $config = [] ) {
		if ( empty( $config['filter_fields'] ) ) {
			$config['filter_fields'] = [
				'id',
				'a.id',
				'title',
				'a.title',
				'markup',
				'a.markup',
				'post_date',
				'a.post_date',
				'modified_date',
				'a.modified_date',
				'published',
				'a.published',
				'created_by',
				'a.created_by',
				'post_content_filtered',
				'a.post_content_filtered',
				'features_media_url',
				'a.featured_media_url',
			];
		}

		parent::__construct( $config );
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return  \JDatabaseQuery
	 *
	 * @since  0.1.0
	 */
	protected function getListQuery() {
		 // Create a new query object.
		$db    = $this->getDbo();
		$query = $db->getQuery( true );

		// Select the required fields from the table.
		$query->select(
			$db->quoteName(
				explode(
					', ',
					$this->getState(
						'list.select',
						'a.id, a.title, a.markup' .
						', a.post_date' .
						', a.published' .
						', a.created_by, a.modified_date' .
						', a.post_content_filtered'
					)
				)
			)
		);

		$query->from( $db->quoteName( '#__webstories', 'a' ) );

		// Filter by published state
		$published = (string) $this->getState( 'filter.published' );

		if ( is_numeric( $published ) ) {
			$query->where( $db->quoteName( 'a.published' ) . ' = ' . (int) $published );
		} elseif ( $published === '' ) {
			$query->where( '(' . $db->quoteName( 'a.published' ) . ' = 0 OR ' . $db->quoteName( 'a.published' ) . ' = 1)' );
		}
		// Filter by search in name.
		$search = $this->getState( 'filter.search' );

		if ( ! empty( $search ) ) {
			if ( stripos( $search, 'id:' ) === 0 ) {
				$query->where( 'a.id = ' . (int) substr( $search, 3 ) );
			} else {
				$search = $db->quote( '%' . str_replace( ' ', '%', $db->escape( trim( $search ), true ) . '%' ) );
				$query->where(
					'(' . $db->quoteName( 'a.name' ) . ' LIKE ' . $search . ')'
				);
			}
		}

		return $query;
	}
	/**
	 * Method to get a single record.
	 *
	 * @param   integer $pk  The id of the primary key.
	 *
	 * @return  mixed  Object on success, false on failure.
	 *
	 * @since  0.1.0
	 */
	public function getItem( $pk = null ) {
		$item = parent::getItem( $pk );

		// Load associated helloapi items
		$assoc = Associations::isEnabled();

		if ( $assoc ) {
			$item->associations = [];

			if ( $item->id != null ) {
				$associations = Associations::getAssociations( 'com_webstories', '#__webstories', 'com_webstories.item', $item->id, 'id', null );

				foreach ( $associations as $tag => $association ) {
					$item->associations[ $tag ] = $association->id;
				}
			}
		}

		return $item;
	}
	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string $ordering   An optional ordering field.
	 * @param   string $direction  An optional direction (asc|desc).
	 *
	 * @return  void
	 *
	 * @since  0.1.0
	 */
	protected function populateState( $ordering = 'a.name', $direction = 'asc' ) {
		$app = Factory::getApplication();

		$forcedLanguage = $app->input->get( 'forcedLanguage', '', 'cmd' );

		// Adjust the context to support modal layouts.
		if ( $layout = $app->input->get( 'layout' ) ) {
			$this->context .= '.' . $layout;
		}

		// Adjust the context to support forced languages.
		if ( $forcedLanguage ) {
			$this->context .= '.' . $forcedLanguage;
		}

		// List state information.
		parent::populateState( $ordering, $direction );

		// Force a language.
		if ( ! empty( $forcedLanguage ) ) {
			$this->setState( 'filter.language', $forcedLanguage );
		}
	}
}
