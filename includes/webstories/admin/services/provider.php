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
defined( '_JEXEC' ) or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\Extension\Service\Provider\MVCFactory;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;

return new class() implements ServiceProviderInterface {
	
	public function register( Container $container ): void {
		$container->registerServiceProvider( new MVCFactory( '\\Google\\Component\\WebStories' ) );
		$container->registerServiceProvider( new ComponentDispatcherFactory( '\\Google\\Component\\WebStories' ) );
		$container->set(
			ComponentInterface::class,
			function ( Container $container ) {
				$component = new MVCComponent( $container->get( ComponentDispatcherFactoryInterface::class ) );
				$component->setMVCFactory( $container->get( MVCFactoryInterface::class ) );

				return $component;
			}
		);
	}
};
