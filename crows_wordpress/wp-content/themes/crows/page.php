<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>

<?php
	// if ( is_front_page() && twentyfourteen_has_featured_posts() ) {
	// 	get_template_part( 'featured-content' );
	// }
?>

	<div class="container">
		<aside id="aside" class="grid_3">
			<?php
				if ( have_posts() ) :
					while ( have_posts() ) : the_post();
						if ($post->post_parent > 0):
							echo "<h4>" .  get_the_title($post->post_parent) . "</h4>";
							echo '<ul id="navigation">';
							echo '<li><a href="' . get_permalink($post->post_parent) . '">Overview</a></li>';
							wp_list_pages(array( "title_li" => "", "child_of" => $post->post_parent ));
							echo '</ul>';
						else:
							echo "<h4>" .  the_title('', '', false) . "</h4>";
							echo '<ul id="navigation">';
							echo '<li class="current_page_item"><a href="' . $post->slug . '">Overview</a></li>';
							wp_list_pages(array( "title_li" => "", "child_of" => $post->ID ));
							echo '</ul>';
						endif;
					endwhile;
				endif;
			?>
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
	</div>

<?php
// get_sidebar();
get_footer();
?>