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

	<section id="content_container" class="container clearfix">
		<aside id="aside" class="grid_3">
			<h4>The Crows</h4>
			<nav id="navigation">
				<a href="" class="active">Overview</a>
				<a href="">History of the Crows</a>
				<a href="">Player Profiles</a>
				<a href="">Training Info</a>
			</nav>
		</aside>
		<div id="content" class="grid_9">
			<h2>The Crows</h2>
			<img src="team.jpg">
			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
			<p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
			<p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
			<p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.</p>
		</div>
	</section>

<?php
// get_sidebar();
get_footer();
?>