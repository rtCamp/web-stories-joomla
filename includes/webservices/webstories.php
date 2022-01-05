<?php
/**
 * @package    Joomla.Plugin
 * @subpackage webservices
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

defined( '_JEXEC' ) or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\ApiRouter;
use Joomla\Router\Route;

class PlgWebservicesWebstories extends CMSPlugin {

	protected $autoloadLanguage = true;
	public function onBeforeApiRoute( &$router ) {
		$router->createCRUDRoutes(
			'v1/webstories',
			'webstories.get_all_stories',
			[ 'component' => 'com_webstories' ]
		);
		$router->createCRUDRoutes(
			'v1/webstories/create_story_from_template',
			'webstories.create_story_from_template',
			[ 'component' => 'com_webstories' ]
		);
		$router->createCRUDRoutes(
			'v1/webstories/update',
			'webstories.update',
			[ 'component' => 'com_webstories' ]
		);
		$router->createCRUDRoutes(
			'v1/webstories/save_file',
			'webstories.save_file',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/getimages',
			'webstories.getimages',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/getvideos',
			'webstories.getvideos',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/getall',
			'webstories.getall',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/duplicate',
			'webstories.duplicate',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/rename',
			'webstories.rename',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/getSingle',
			'webstories.getSingle',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/delete',
			'webstories.deleteSingle',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/users',
			'webstories.getAllAuthors',
			[ 'component' => 'com_webstories' ],
		);
		$router->createCRUDRoutes(
			'v1/webstories/deleteMedia',
			'webstories.deleteMedia',
			[ 'component' => 'com_webstories' ],
		);
		
	}
}
