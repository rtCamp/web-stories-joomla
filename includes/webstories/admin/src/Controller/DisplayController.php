<?php
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
namespace Google\Component\WebStories\Administrator\Controller;

defined( '_JEXEC' ) or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

class DisplayController extends BaseController {
	/**
	 * The default view for the display method.
	 *
	 * @var string
	 */
	protected $default_view = 'dashboard';
	public function display( $cachable = false, $urlparams = [] ) {
		$view = $this->input->get( 'view' );
		if ( $view == 'storyeditor' ) {
			if ( isset( $_GET['create_new'] ) ) {
				$db = Factory::getDbo();
					// Create a new query object.
					$query = $db->getQuery( true );
					
					// Insert columns.
					$columns = [ 'published', 'post_content_filtered', 'created_by' ];
					// Insert values.
					$user   = Factory::getUser();
					$values = [
						'-1',
						$db->quote(
							json_encode(
								[
									'version' => 1, 
									'pages'   => [],
								] 
							) 
						),
						$user->id,
					];
					// Prepare the insert query.
					$query
						->insert( $db->quoteName( '#__webstories' ) )
						->columns( $db->quoteName( $columns ) )
						->values( implode( ',', $values ) );
			
					// // Set the query using our newly populated query object and execute it.
					$db->setQuery( $query );
					$db->execute();
					$id = $db->insertid();
					$this->setRedirect( Route::_( 'index.php?option=com_webstories&view=storyeditor&id=' . $id, false ) );
			} else {
				$id = $this->input->get( 'id' );
				// Somehow the person just went to the story-editor - we don't allow that.
				if ( preg_match( '/[0-9]/', $_GET['id'] ) === 0 ) {
					$this->setRedirect( Route::_( 'index.php?option=com_webstories', false ) );
				}
			}
		}
		return parent::display( $cachable, $urlparams );
	}
	
}
