<?php

/**
 * @package    Joomla.Api
 * @subpackage webstories
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
namespace Google\Component\WebStories\Api\Controller;

require_once 'getid3/getid3.php';
error_reporting( 1 );
defined( '_JEXEC' ) or die;

use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Controller\ApiController;

class WebstoriesController extends ApiController {

	protected $contentType  = 'webstories';
	protected $default_view = 'stories';
	public function update() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		$data = (array) json_decode( $this->input->json->getRaw(), true );
		$db   = Factory::getDbo();
		// Create a new query object.
		$query  = $db->getQuery( true );
		$fields = [];
		$json   = $db->quote( json_encode( $data['post_content_filtered'] ) );
		// Insert columns.

		$query = 'UPDATE `#__webstories` SET `markup`=' . json_encode( $data['markup'] ) . ",`title`='" . $data['title'] . "',`modified_date`='" . $data['modified_date'] . "',
        `created_by`='" . $data['created_by'] . "',`published`='" . $data['published'] . "', `post_content_filtered`=" . $json . ", 
        `story_description`='" . $data['excerpt'] . "',featured_media_url='" . $data['featured_media'] . "'WHERE id=" . $data['id'];


		// // Set the query using our newly populated query object and execute it.
		$db->setQuery( $query );
		$db->execute();
		echo json_encode(
			[
				'storyId'         => $data['id'],
				'status'          => 'publish',
				'slug'            => '',
				'link'            => '',
				'preview_link'    => '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $data['id'],
				'edit_link'       => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $data['id'],
				'embed_post_link' => '',
				'featured_media'  => [
					'url' => $data['featured_media'],
				],
			]
		);
		exit;
	}
	public function save_file() {
		if ( ! file_exists( '../images/webstories/images' ) ) {
			mkdir( '../images/webstories/images', 0777, true );
		}
		if ( ! file_exists( '../images/webstories/videos' ) ) {
			mkdir( '../images/webstories/videos', 0777, true );
		}
		$data             = (array) $this->input->files->get( 'media' );
		$data_poster_file = (array) $this->input->files->get( 'poster_image' );
		$file_data        = file_get_contents( $data['tmp_name'] );
		$extension        = pathinfo( $data['name'], PATHINFO_EXTENSION );
		$images           = [ 'png', 'jpg', 'jpeg', 'webp' ];
		if ( in_array( $extension, $images ) ) {
			$path_parts = pathinfo( $data['name'] );
			$result     = file_put_contents( '../images/webstories/images/' . basename( $data['name'] ), $file_data );
			echo json_encode( $result ? $this->getImageData( $path_parts['filename'], '../images/webstories/images/' . basename( $data['name'] ), getimagesize( $data['name'] )[0], getimagesize( $data['name'] )[1], 'image/' . $extension, basename( $data['name'] ), $extension ) : false );
			exit;
		}
		$videos = [ 'mov', 'mp4', 'webm' ];
		if ( in_array( $extension, $videos ) ) {
			$path_parts = pathinfo( $data['name'] );
			$result     = file_put_contents( '../images/webstories/videos/' . basename( $data['name'] ), $file_data );
			$result     = file_put_contents( '../images/webstories/videos/' . $path_parts['filename'] . '.jpeg', file_get_contents( $data_poster_file['tmp_name'] ) );
			echo json_encode( $result ? $this->getVideoData( 'video/' . $extension, '../images/webstories/videos/' . basename( $data['name'] ), basename( $data['name'] ), $path_parts['filename'], '../images/webstories/videos/' . $path_parts['filename'] . '.jpeg' ) : false );
			exit;
		}
	}
	public function getimages() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {
			$url = 'https://';
		} else {
			$url = 'http://';
		}
		$url      .= $_SERVER['HTTP_HOST'] . '/' . $parts[1] . '/images/webstories/images/';
		$response  = [];
		$imagetype = [ 'png', 'jpg', 'jpeg', 'webp' ];
		$count     = 0;
		foreach ( $imagetype as $filetype ) {
			$mimetype = 'image/' . $filetype;
			foreach ( glob( realpath( '../images/webstories/images' ) . '/*.' . $filetype ) as $filename ) {
				array_push( $response, $this->getImageData( ( explode( ',', basename( $filename ) )[0] ), $url . basename( $filename ), getimagesize( $filename )[0], getimagesize( $filename )[1], $mimetype, basename( $filename ), $filetype ) );
				$count++;
			}
		}
		header( 'X-WP-Total:' . $count );
		header( 'X-WP-TotalPages:1' );
		echo json_encode( $response );
		exit;
	}
	public function getvideos() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {
			$url = 'https://';
		} else {
			$url = 'http://';
		}
		$url      .= $_SERVER['HTTP_HOST'] . '/' . $parts[1] . '/images/webstories/videos/';
		$response  = [];
		$videotype = [ 'mov', 'mp4', 'webm' ];
		$count     = 0;
		foreach ( $videotype as $filetype ) {
			$mimetype = 'video/' . $filetype;
			foreach ( glob( realpath( '../images/webstories/videos' ) . '/*.' . $filetype ) as $filename ) {
				$path_parts = pathinfo( $url . 'videos/' . basename( $filename ) );
				array_push( $response, $this->getVideoData( $mimetype, $url . basename( $filename ), basename( $filename ), $path_parts['filename'], $url . $path_parts['filename'] . '.jpeg' ) );
				$count++;
			}
		}
		header( 'X-WP-Total:' . $count );
		header( 'X-WP-TotalPages:1' );
		echo json_encode( $response );
		exit;
	}
	public function getall() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {
			$url = 'https://';
		} else {
			$url = 'http://';
		}
		$url      .= $_SERVER['HTTP_HOST'] . '/' . $parts[1] . '/images/webstories/';
		$response  = [];
		$imagetype = [ 'png', 'jpg', 'jpeg', 'webp' ];
		$videotype = [ 'mov', 'mp4', 'webm' ];
		$count     = 0;
		foreach ( $videotype as $filetype ) {
			$mimetype = 'video/' . $filetype;
			foreach ( glob( realpath( '../images/webstories/videos' ) . '/*.' . $filetype ) as $filename ) {
				$path_parts = pathinfo( $url . 'videos/' . basename( $filename ) );
				array_push( $response, $this->getVideoData( $mimetype, $url . 'videos/' . basename( $filename ), basename( $filename ), $path_parts['filename'], $url . 'videos/' . $path_parts['filename'] . '.jpeg' ) );
				$count++;
			}
		}
		foreach ( $imagetype as $filetype ) {
			$mimetype = 'image/' . $filetype;
			foreach ( glob( realpath( '../images/webstories/images' ) . '/*.' . $filetype ) as $filename ) {
				$path_parts = pathinfo( $url . 'images/' . basename( $filename ) );
				array_push( $response, $this->getImageData( ( explode( ',', basename( $filename ) )[0] ), $url . 'images/' . basename( $filename ), getimagesize( $filename )[0], getimagesize( $filename )[1], $mimetype, basename( $filename ), $filetype ) );
				$count++;
			}
		}
		header( 'X-WP-Total:' . $count );
		header( 'X-WP-TotalPages:1' );
		echo json_encode( $response );
		exit;
	}
	public function getImageData( $title, $src, $width, $height, $mimetype, $id, $filetype ) {
		return [
			'type'          => 'image',
			'mimeType'      => $mimetype,
			'creationDate'  => '2021-10-29T11:43:38',
			'src'           => $src,
			'width'         => $width,
			'height'        => $height,
			'id'            => $id,
			'alt'           => $title,
			'sizes'         => [
				'medium'                      => [
					'file'       => $title . '-300x84.' . $filetype,
					'width'      => 300,
					'height'     => 84,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'large'                       => [
					'file'       => $title . '-1024x288.' . $filetype,
					'width'      => 1024,
					'height'     => 288,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'thumbnail'                   => [
					'file'       => $title . '-150x150.' . $filetype,
					'width'      => 150,
					'height'     => 150,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'medium_large'                => [
					'file'       => $title . '-768x216.' . $filetype,
					'width'      => 768,
					'height'     => 216,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'1536x1536'                   => [
					'file'       => $title . '-1536x432.' . $filetype,
					'width'      => 1536,
					'height'     => 432,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'2048x2048'                   => [
					'file'       => $title . '-2048x576.' . $filetype,
					'width'      => 2048,
					'height'     => 576,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'post-thumbnail'              => [
					'file'       => $title . '-1568x441.' . $filetype,
					'width'      => 1568,
					'height'     => 441,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'web-stories-poster-portrait' => [
					'file'       => $title . '-640x853.' . $filetype,
					'width'      => 640,
					'height'     => 853,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'web-stories-publisher-logo'  => [
					'file'       => $title . '-96x96.' . $filetype,
					'width'      => 96,
					'height'     => 96,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'web-stories-thumbnail'       => [
					'file'       => $title . '-150x42.' . $filetype,
					'width'      => 150,
					'height'     => 42,
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
				'full'                        => [
					'file'       => $title,
					'width',
					'height',
					'mime_type'  => $mimetype,
					'source_url' => $src,
				],
			],
			'local'         => false,
			'isPlaceholder' => false,
			'isOptimized'   => false,
			'isMuted'       => false,
			'isExternal'    => false,
		];
	}
	public function getVideoData( $mimeType, $src, $id, $title, $poster ) {
		$file_info = [];
		if ( $src ) {
			$filename = tempnam( '/tmp', 'getid3' );
			if ( file_put_contents( $filename, file_get_contents( $src ) ) ) {
				$getID3    = new \getID3();
				$file_info = $getID3->analyze( $filename );
				unlink( $filename );
			}
		}
		return [
			'type'            => 'video',
			'mimeType'        => $mimeType,
			'creationDate'    => '2021-10-29T11:56:33',
			'src'             => $src,
			'width'           => $file_info['video']['resolution_x'],
			'height'          => $file_info['video']['resolution_y'],
			'poster'          => $poster,
			'id'              => $id,
			'length'          => round( $file_info['playtime_seconds'] ),
			'lengthFormatted' => $file_info['playtime_string'],
			'alt'             => $title,
			'sizes'           => [],
			'local'           => false,
			'isPlaceholder'   => false,
			'isOptimized'     => false,
			'isMuted'         => false,
			'isExternal'      => false,
			'trimData'        => [
				'original' => 0,
			],
			'data'            => $file_info,
		];
	}
	public function rename() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		$data = (array) json_decode( $this->input->json->getRaw(), true );
		$db   = Factory::getDbo();
		// Create a new query object.
		$query = $db->getQuery( true );
		// Insert columns.
		$user  = Factory::getUser();
		$query = "UPDATE `#__webstories` SET `title`= '" . $data['title'] . "' WHERE id=" . $data['id'];
		$db->setQuery( $query );
		$db->execute();
		$query = 'select * from #__webstories where id = ' . $data['id'];
		$db->setQuery( $query );
		$item = $db->loadAssoc();
		$db->execute();
		$single_story = [
			'id'                 => $item['id'],
			'status'             => $item['published'] === 1 ? 'published' : 'draft',
			'title'              => $item['title'],
			'created'            => $item['post_date'],
			'createdGmt'         => $item['post_date'],
			'author'             => [
				'name' => $user->username,
				'id'   => $user->id,
			],
			'capabilities'       => [
				'hasEditAction'   => true,
				'hasDeleteAction' => true,
			],
			'modified'           => $item['modified_date'],
			'modifiedGmt'        => $item['modified_date'],
			'editStoryLink'      => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $item['id'],
			'previewLink'        => '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $item['id'],
			'bottomTargetAction' => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $data['id'],
			'featuredMediaUrl'   => '',
		];
		echo json_encode( $single_story );
		exit;
	}
	public function duplicate() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		$data     = (array) json_decode( $this->input->json->getRaw(), true );
		$story_id = $data['id'];
		$db       = Factory::getDbo();
		$user     = Factory::getUser();
		$query    = $db->getQuery( true );
		$query
		->select( $db->quoteName( [ 'a.id', 'a.markup', 'a.post_date', 'a.title', 'a.modified_date', 'a.created_by', 'a.published', 'a.post_content_filtered', 'a.story_description', 'b.username' ] ) )
		->from( $db->quoteName( '#__webstories', 'a' ) )
		->join( 'INNER', $db->quoteName( '#__users', 'b' ) . ' ON ' . $db->quoteName( 'a.created_by' ) . ' = ' . $db->quoteName( 'b.id' ) )
		->where( $db->quoteName( 'a.id' ) . '=' . $story_id );
		$db->setQuery( $query );
		$item       = $db->loadAssoc();
		$story_data = ! empty( $item['post_content_filtered'] ) ? json_decode( $item['post_content_filtered'] ) : [];
		// Insert duplicate story into table.
		$query = 'insert into #__webstories (markup,post_content_filtered,published,title, created_by) values (' . json_encode( $item['markup'] ) . ',' . json_encode( $item['post_content_filtered'] ) . ",0,'" . $item['title'] . "(Copy)','" . $user->id . "')";
		$db->setQuery( $query );
		$db->execute();
		$single_story = [
			'id'                 => $db->insertid(),
			'status'             => 'draft',
			'title'              => $item['title'] . '(Copy)',
			'created'            => date( 'Y-m-d H:i:s' ),
			'createdGmt'         => date( 'Y-m-d H:i:s' ),
			'author'             => [
				'name' => $user->username,
				'id'   => $user->id,
			],
			'capabilities'       => [
				'hasEditAction'   => true,
				'hasDeleteAction' => true,
			],
			'modified'           => date( 'Y-m-d H:i:s' ),
			'modifiedGmt'        => date( 'Y-m-d H:i:s' ),
			'editStoryLink'      => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $db->insertid(),
			'previewLink'        => '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $db->insertid(),
			'bottomTargetAction' => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $db->insertid(),
			'featuredMediaUrl'   => '',
		];
		echo json_encode( $single_story );
		exit;
	}
	public function get_all_stories() {
		$url          = $_SERVER['REQUEST_URI'];
		$parts        = explode( '/', $url );
		$page         = ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) ) ? $_GET['page'] : 1;
		$status       = ( isset( $_GET['status'] ) && ! empty( $_GET['status'] ) ) ? $_GET['status'] : 'all';
		$status       = $status === 'draft,future,pending,publish,private' ? 'all' : $status;
		$stories_page = 20;
		$data         = (array) json_decode( $this->input->json->getRaw(), true );
		$db           = Factory::getDbo();
		$query        = $db->getQuery( true );
		$query
		->select( $db->quoteName( [ 'a.id', 'a.markup', 'a.post_date', 'a.title', 'a.modified_date', 'a.created_by', 'a.published', 'a.post_content_filtered', 'a.story_description', 'a.featured_media_url', 'b.username' ] ) )
		->from( $db->quoteName( '#__webstories', 'a' ) )
		->join( 'INNER', $db->quoteName( '#__users', 'b' ) . ' ON ' . $db->quoteName( 'a.created_by' ) . ' = ' . $db->quoteName( 'b.id' ) )
		->setLimit( $stories_page, $stories_page * ( $page - 1 ) );
		$db->setQuery( $query );
		$items = $db->loadAssocList();
		$db->setQuery( $query );
		$db->execute();
		$response        = [];
		$stories         = [];
		$fetchedStoryIds = [];
		$published       = 0;
		$draft           = 0;
		$story_status    = $status === 'publish' ? 1 : ( $status === 'draft' ? 0 : ( $status === 'all' ? 10 : -1 ) );
		foreach ( $items as $item ) {
			if ( (int) $item['published'] !== -1 ) {
				if ( $story_status === $item['published'] || $story_status === 10 ) {
					$single_story           = [
						'id'                 => $item['id'],
						'status'             => $item['published'] === 1 ? 'publish' : 'draft',
						'title'              => $item['title'],
						'created'            => $item['post_date'],
						'createdGmt'         => $item['post_date'],
						'author'             => [
							'id'   => $item['created_by'],
							'name' => $item['username'],
						],
						'capabilities'       => [
							'hasEditAction'   => true,
							'hasDeleteAction' => true,
						],
						'modified'           => $item['modified_date'],
						'modifiedGmt'        => $item['modified_date'],
						'editStoryLink'      => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $item['id'],
						'previewLink'        => '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $item['id'],
						'bottomTargetAction' => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $data['id'],
						'featuredMediaUrl'   => $item['featured_media_url'],
					];
					$stories[ $item['id'] ] = $single_story;
					array_push( $fetchedStoryIds, $item['id'] );
				}
				$item['published'] === 1 ? $published++ : $draft++;
			}
		}
		$response['totalPages']           = 1;
		$totalStoriesByStatus             = [
			'all'     => $published + $draft,
			'publish' => $published,
			'draft'   => $draft,
		];
		$response['totalStoriesByStatus'] = $totalStoriesByStatus;
		$response['stories']              = $stories;
		$response['fetchedStoryIds']      = $fetchedStoryIds;
		echo json_encode( $response );
		exit;
	}
	public function getSingle() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );
		if ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ) {
			$url = 'https://';
		} else {
			$url = 'http://';
		}
		if ( isset( $_GET['id'] ) && ! empty( $_GET['id'] ) ) {
			$story_id = (int) $_GET['id'];
			$db       = Factory::getDbo();
			$query    = $db->getQuery( true );
			$query
			->select( $db->quoteName( [ 'a.id', 'a.markup', 'a.post_date', 'a.title', 'a.modified_date', 'a.created_by', 'a.published', 'a.post_content_filtered', 'a.story_description', 'a.featured_media_url', 'b.username' ] ) )
			->from( $db->quoteName( '#__webstories', 'a' ) )
			->join( 'INNER', $db->quoteName( '#__users', 'b' ) . ' ON ' . $db->quoteName( 'a.created_by' ) . ' = ' . $db->quoteName( 'b.id' ) )
			->where( $db->quoteName( 'a.id' ) . '=' . $story_id );
			$db->setQuery( $query );
			$item       = $db->loadAssoc();
			$story_data = ! empty( $item['post_content_filtered'] ) ? json_decode( $item['post_content_filtered'] ) : [];
			echo json_encode(
				[
					'title'              => [
						'raw' => $item['title'],
					],
					'excerpt'            => [
						'raw' => $item['story_description'],
					],
					'status'             => $item['published'] === 1 ? 'published' : 'draft',
					'slug'               => $story_id,
					'date'               => $item['post_date'],
					'modified'           => $item['modified_date'],
					'story_data'         => $story_data,
					'link'               => $url . $_SERVER['HTTP_HOST'] . '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $story_id,
					'preview_link'       => '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=' . $story_id,
					'edit_link'          => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $story_id,
					'embed_post_link'    => '',
					'featured_media'     => '',
					'capabilities'       => [
						'hasEditAction'   => true,
						'hasDeleteAction' => true,
						'assign-author'   => true,
						'publish'         => true,
					],
					'author'             => [
						'id'   => $item['created_by'],
						'name' => $item['username'],
					],
					'lock_user'          => '',
					'featured_media'     => [
						'url' => $item['featured_media_url'],
					],
					'publisher_logo'     => '',
					'taxonomies'         => [],
					'terms'              => [],
					'style_presets'      => [],
					'permalink_template' => $url . $_SERVER['HTTP_HOST'] . '/' . $parts[1] . '/index.php?option=com_webstories&view=storyeditor&id=%pagename%',
				]
			);
			exit;
		}
	}
	public function deleteSingle() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		$data     = (array) json_decode( $this->input->json->getRaw(), true );
		$story_id = $data['id'];
		$db       = Factory::getDBO();
		$query    = $db->getQuery( true );
		$query->delete( $db->quoteName( '#__webstories' ) );
		$query->where( $db->quoteName( 'id' ) . '=' . $story_id );
		$db->setQuery( $query );
		$result = $db->execute();
		echo json_encode( $result );
		exit;
	}
	public function create_story_from_template() {
		$url   = $_SERVER['REQUEST_URI'];
		$parts = explode( '/', $url );

		$data = (array) json_decode( $this->input->json->getRaw(), true );
		$db   = Factory::getDbo();
		// Create a new query object.
		$query  = $db->getQuery( true );
		$fields = [];
		$json   = $db->quote( json_encode( $data['storyData'] ) );
		$markup = json_encode( $data['content'] );
		$query  = 'INSERT into `#__webstories` (markup,post_content_filtered,published,title,created_by) VALUES (' . $markup . ',' . $json . ",-1,'','WordPress'); ";
		$db->setQuery( $query );
		$db->execute();
		echo json_encode(
			[
				'editLink' => '/' . $parts[1] . '/administrator/index.php?option=com_webstories&view=storyeditor&id=' . $db->insertid(),
			]
		);
		exit;
	}
	public function getAllAuthors() {
		$db = Factory::getDbo();
		// Create a new query object.
		$query  = $db->getQuery( true );
		$fields = [];
		$query
		->select( $db->quoteName( [ 'id', 'username' ] ) )
		->from( $db->quoteName( '#__users' ) );
		$db->setQuery( $query );
		$items = $db->loadAssocList();
		$db->execute();
		$users = [];
		foreach ( $items as $item ) {
			array_push(
				$users,
				[
					'id'   => $item['id'],
					'name' => $item['username'],
				] 
			);
		}
		echo json_encode( $users );
		exit;
	}
	public function deleteMedia() {
		$imagetype      = [ 'png', 'jpg', 'jpeg', 'webp' ];
		$videotype      = [ 'mov', 'mp4', 'webm' ];
		$data           = (array) json_decode( $this->input->json->getRaw(), true );
		$filename       = $data['id'];
		$file_extension = explode( '.', $filename );
		if ( in_array( $file_extension[1], $imagetype ) ) {
			$result = unlink( '../images/webstories/images/' . $filename );
			echo json_encode( $result );
			exit;
		}
		if ( in_array( $file_extension[1], $videotype ) ) {
			$result = unlink( '../images/webstories/videos/' . $filename );
			$result = unlink( '../images/webstories/videos/' . $file_extension[0] . '.jpeg' );
			echo json_encode( $filename );
			exit;
		}
		echo json_encode( $data );
		exit;
	}
}
