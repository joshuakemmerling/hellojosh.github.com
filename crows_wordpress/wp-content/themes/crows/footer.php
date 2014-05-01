<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?>
	<footer id="footer">
		<div class="container clearfix">
			<div class="grid_6">
				<?php bloginfo( 'name' ); ?>
				<br />
				<?php dynamic_sidebar( 'footer_widget' ); ?>
			</div>
		</div>
	</footer>
	<?php wp_footer(); ?>
</body>
</html>