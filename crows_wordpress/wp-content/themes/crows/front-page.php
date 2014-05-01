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
		<div class="grid_12">
			<?php
				if ( have_posts() ) :
					while ( have_posts() ) : the_post();
						the_content();
					endwhile;
				endif;
			?>
		</div>
	</div>

	<div class="container">
		<div class="grid_12">
			<section id="master_schedule">
				<div id="master_schedule_wrap">
					<div id="master_schedule_title">
						<div class="fl">2014 Schedule</div>
						<a href="" class="fr">View Entire Schedule</a>
					</div>
					<?php foreach ($events_array as $event) { ?>
					<div class="match first_match">
						<div class="datetime clearfix">
							<div class="fl"><?php echo date('D M j', strtotime($event->EventStartDate)); ?></div>
							<div class="fr"><?php echo date('g a', strtotime($event->EventStartDate)); ?></div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">
								<?php if (get_post_meta($event->ID, "place", true) == "home") { echo "@"; } ?>
								Austin
							</div>
							<div class="fr"><?php echo get_post_meta($event->ID, "us", true); ?></div>
							<div class="clear"></div>
							<div class="fl">
								<?php if (get_post_meta($event->ID, "place", true) != "home") { echo "@"; } ?>
								<?php echo get_post_meta($event->ID, "opponent", true); ?>
							</div>
							<div class="fr"><?php echo get_post_meta($event->ID, "them", true); ?></div>
						</div>
					</div>
					<?php } ?>
				</div>
			</section>
		</div>
	</div>

	<!-- <div class="container">
		<div class="grid_12">
			<section id="master_schedule">
				<div id="master_schedule_wrap">
					<div id="master_schedule_title">
						<div class="fl">2014 Schedule</div>
						<a href="" class="fr">View Entire Schedule</a>
					</div>
					<div class="match first_match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="fr">23</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
							<div class="fr">23</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="fr">23</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
							<div class="fr">23</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
					<div class="match">
						<div class="datetime clearfix">
							<div class="fl">Fri Apr 11</div>
							<div class="fr">2 pm</div>
						</div>
						<div class="match_teams clearfix">
							<div class="fl">Austin</div>
							<div class="clear"></div>
							<div class="fl">@ Dallas</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div> -->

	<!-- <section id="content_container" class="container clearfix">
		<div id="hero" class="grid_12">
			<img src="team.jpg">
			<div id="description">
				<strong>2013 USAFL</strong><br />Nationals Champions
			</div>
		</div>
	</section> -->

	<section id="sponsors" class="container clearfix">
		<h3>Sponsors</h3>
		<a href="">
			<img src="http://www.austinfooty.com/images/myplates.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/sixlogo--converted-.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/taplogo1--converted-.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/myplates.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/sixlogo--converted-.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/taplogo1--converted-.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/myplates.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/sixlogo--converted-.png">
		</a>
		<a href="">
			<img src="http://www.austinfooty.com/images/taplogo1--converted-.png">
		</a>
		<div class="grid_12">
			<a href="">View all sponsors</a>
		</div>
	</section>

<?php
// get_sidebar();
get_footer();
?>