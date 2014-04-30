<?php
/**
 * The Header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8) ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<?php if ( get_header_image() ) : ?>
	<!-- <div id="site-header">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
			<img src="<?php header_image(); ?>" width="<?php echo get_custom_header()->width; ?>" height="<?php echo get_custom_header()->height; ?>" alt="">
		</a>
	</div> -->
	<?php endif; ?>

	<header id="header2">
		<div id="header_wrap">
			<div class="container clearfix">
				<div class="grid_8">
					<h1>
						<a href="/">
							<img src="shield.png">
						</a>
					</h1>
					<div id="headline">
						<div id="line1">the official site of the</div>
						<div id="line2">Austin Crows Football Club</div>
						<div id="line3">Bringing Aussie Rules to Austin since 2002</div>
					</div>
				</div>
				<div id="header_logos" class="grid_4">
					<a href="">
						<img src="http://www.austinfooty.com/images/myplates.png">
					</a>
					<a href="">
						<img src="http://www.austinfooty.com/images/sixlogo--converted-.png">
					</a>
					<a href="">
						<img src="http://www.austinfooty.com/images/taplogo1--converted-.png">
					</a>
				</div>
			</div>
			<nav id="header_nav">
				<div class="container clearfix">
						<?php wp_nav_menu(array( 'theme_location' => 'primary', 'menu_class' => 'grid_12', 'items_wrap' => '' )); ?>
				</div>
			</nav>
		</div>
	</header>
