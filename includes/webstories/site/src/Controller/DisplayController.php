<?php
/**
 * @package    Joomla.Site
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
namespace Google\Component\WebStories\Site\Controller;

defined( '_JEXEC' ) or die;
use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Controller\BaseController;
class DisplayController extends BaseController {
	public function display( $cachable = false, $urlparams = [] ) {        
		$document   = Factory::getDocument();
		$viewName   = $this->input->getCmd( 'view', 'login' );
		$viewFormat = $document->getType();
		
		$view = $this->getView( $viewName, $viewFormat );
		
		$view->document = $document;
		$view->display();
	}
	
}
