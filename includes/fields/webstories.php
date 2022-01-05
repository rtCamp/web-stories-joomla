<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Fields
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

class PlgFieldsWebstories extends \Joomla\Component\Fields\Administrator\Plugin\FieldsListPlugin {

	public function onCustomFieldsBeforePrepareField( $context, $item, $field ) {
		if ( ! $this->app->isClient( 'api' ) ) {
			return;
		}

		if ( ! $this->isTypeSupported( $field->type ) ) {
			return;
		}

		$options         = $this->getOptionsFromField( $field );
		$field->apivalue = [ $field->value => $options[ $field->value ] ];
	}
	public function onCustomFieldsPrepareField( $context, $item, $field ) {
		// Check if the field should be processed
		if ( ! $this->isTypeSupported( $field->type ) ) {
			return;
		}

		// The field's rawvalue should be an array
		if ( ! is_array( $field->rawvalue ) ) {
			$field->rawvalue = (array) $field->rawvalue;
		}
		return parent::onCustomFieldsPrepareField( $context, $item, $field );
	}
}
