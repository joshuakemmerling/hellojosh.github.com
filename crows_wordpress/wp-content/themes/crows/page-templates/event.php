<?php
/**
 * Template Name: Event Page
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>

	<section id="content_container" class="container clearfix">
		<aside id="aside" class="grid_3">
			<?php
				$parts = array_slice(array_filter(explode("/", strtolower($_SERVER["REQUEST_URI"]))), 0);
				$size = count($parts);
				$category = ($size > 2) ? $parts[2] : "";
			?>
			<h4>Events</h4>
			<ul id="navigation">
				<li class="<?php echo ($size == 1) ? "current_page_item" : ""; ?>"><a href="/events">Overview</a></li>
				<?php $tc = get_categories(array( "taxonomy" => "tribe_events_cat" )); ?>
				<?php foreach ($tc as $c) { ?>
					<li class="<?php echo ($category == $c->slug) ? "current_page_item" : "" ?>"><a href="/events/category/<?php echo $c->slug ?>/"><?php echo $c->cat_name ?></a></li>
				<?php } ?>
			</ul>
		</aside>
		<div id="content" class="grid_9">
			<?php
				if ( have_posts() ) :
					while ( have_posts() ) : the_post();
						the_content();
					endwhile;
				endif;
			?>
		</div>
	</section>

<?php get_footer(); ?>