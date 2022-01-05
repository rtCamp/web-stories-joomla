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
namespace Google\Component\WebStories\Administrator\View\Dashboard;

defined( '_JEXEC' ) or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

class HtmlView extends BaseHtmlView {
	
	/**
	 * Display the main "Dashboard" view
	 *
	 * @param   string $tpl  The name of the template file to parse; automatically searches through the template paths.
	 * @return  void
	 */
	function display( $tpl = null ) {
		parent::display( $tpl );
	}

}
