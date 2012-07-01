--- 
layout: post
title: Getting Wordpress Post Counts to show up inside anchor tag
categories:
- Wordpress
tags: 
- PHP
- Wordpress
type: post
status: publish
---

_NOTE: This post is referring to my old Wordpress blog. The theme has since changed._  
  
When creating this blog's theme, I decided I wanted the links in the side navigation 
to take up the full width of the navigation.  Also, when hovering, I wanted to highlight 
the whole link/line. This seems like a very simple thing to do with CSS, but by default, 
a few of the Wordpress widgets do not allow for easy customization of the placement of the 
post count.  This makes it hard to create sidebar entries in which the whole line is a link.

For example, by default, I could only get the Archive Widget to print out links in the following format:

{% highlight html %}
<li><a href="/2009/09/">September 2009</a>&nbsp;(1)</li>
{% endhighlight %}

I wanted the links to be in this format (note the (1) is inside the anchor tag):
{% highlight html %}
<li><a href="/2009/09/">September 2009&nbsp;(1)</a></li>
{% endhighlight %}

Below are the steps I took to override the default behavior of the Archive Widget.
For this tutorial, I'm going to modify the "classic" theme that is provided with Wordpress 2.8.
You can download both the original "classic" theme as well as my modified version 
"classic-modified" <a href="/downloads/theme-tutorial-classic-modified.zip">here</a>.

<div class="info-section-note">
NOTE: For detailed instructions on creating a Wordpress theme, there are many tutorials online.  Also, the <a href="http://codex.wordpress.org/Theme_Development">Wordpress.org</a> site has fairly detailed documentation.  The first tutorial I found via a google search was for entry level Wordpress developers, yet it was very helpful: <a href="http://www.wpdesigner.com/2007/02/19/so-you-want-to-create-wordpress-themes-huh/">www.wpdesigner.com</a>.
</div>

<div>&nbsp;</div>

For this tutorial, the first step to take is to copy the "classic" theme.  Rename the copy "classic-modified" and place it in your themes folder.

Now we're going to modify the <b>functions.php</b> file by adding lines 17-18 below:

{% highlight php linenos linenostart=1 %}
<?php
/**
 * @package WordPress
 * @subpackage Classic_Theme
 */

automatic_feed_links();

if ( function_exists('register_sidebar') )
	register_sidebar(array(
		'before_widget' => '<li id="%1$s" class="widget %2$s">',
		'after_widget' => '</li>',
		'before_title' => '',
		'after_title' => '',
	));

// Include the script that replaces the default archive widget
require_once('functions-widgets.php');

?>
{% endhighlight %}

Now create a blank file called <b>functions-widgets.php</b> and place it in your themes folder.  Next, open the file <b>"/wp-includes/default-widgets.php"</b> and copy lines 210-271. Paste these lines in <b>functions-widgets.php</b> so it looks like the code below (Note I've added the opening and closing php tags):

{% highlight php linenos linenostart=1 %}
<?php

/**
 * Archives widget class
 *
 * @since 2.8.0
 */
class WP_Widget_Archives extends WP_Widget {

	function WP_Widget_Archives() {
		$widget_ops = array('classname' => 'widget_archive', 'description' => __( 'A monthly archive of your blog&#8217;s posts') );
		$this->WP_Widget('archives', __('Archives'), $widget_ops);
	}

	function widget( $args, $instance ) {
		extract($args);
		$c = $instance['count'] ? '1' : '0';
		$d = $instance['dropdown'] ? '1' : '0';
		$title = apply_filters('widget_title', empty($instance['title']) ? __('Archives') : $instance['title']);

		echo $before_widget;
		if ( $title )
			echo $before_title . $title . $after_title;

		if ( $d ) {
?>
		<select name="archive-dropdown" onchange='document.location.href=this.options[this.selectedIndex].value;'> <option value=""><?php echo esc_attr(__('Select Month')); ?></option> <?php wp_get_archives(apply_filters('widget_archives_dropdown_args', array('type' => 'monthly', 'format' => 'option', 'show_post_count' => $c))); ?> </select>
<?php
		} else {
?>
		<ul>
		<?php wp_get_archives(apply_filters('widget_archives_args', array('type' => 'monthly', 'show_post_count' => $c))); ?>
		</ul>
<?php
		}

		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$new_instance = wp_parse_args( (array) $new_instance, array( 'title' => '', 'count' => 0, 'dropdown' => '') );
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['count'] = $new_instance['count'] ? 1 : 0;
		$instance['dropdown'] = $new_instance['dropdown'] ? 1 : 0;

		return $instance;
	}

	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'count' => 0, 'dropdown' => '') );
		$title = strip_tags($instance['title']);
		$count = $instance['count'] ? 'checked="checked"' : '';
		$dropdown = $instance['dropdown'] ? 'checked="checked"' : '';
?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>
		<p>
			<input class="checkbox" type="checkbox" <?php echo $count; ?> id="<?php echo $this->get_field_id('count'); ?>" name="<?php echo $this->get_field_name('count'); ?>" /> <label for="<?php echo $this->get_field_id('count'); ?>"><?php _e('Show post counts'); ?></label>
			<br />
			<input class="checkbox" type="checkbox" <?php echo $dropdown; ?> id="<?php echo $this->get_field_id('dropdown'); ?>" name="<?php echo $this->get_field_name('dropdown'); ?>" /> <label for="<?php echo $this->get_field_id('dropdown'); ?>"><?php _e('Display as a drop down'); ?></label>
		</p>
<?php
	}
}

?>
{% endhighlight %}

Now rename:

{% highlight php linenos linenostart=9 %}
class WP_Widget_Archives extends WP_Widget {
{% endhighlight %}

to:

{% highlight php linenos linenostart=9 %}
class MyTheme_Widget_Archives extends WP_Widget {
{% endhighlight %}

We did this because we are effectively creating a new widget, so if we want to use the old "Archives" widget, we can.

Now change the following function from:

{% highlight php linenos linenostart=11 %}
	function WP_Widget_Archives() {
		$widget_ops = array('classname' => 'widget_archive', 'description' => __( 'A monthly archive of your blog&#8217;s posts') );
		$this->WP_Widget('archives', __('Archives'), $widget_ops);
	}
{% endhighlight %}

to:

{% highlight php linenos linenostart=11 %}
	function MyTheme_Widget_Archives() {
		$widget_ops = array('classname' => 'widget_archive', 'description' => __( 'A monthly archive of your blog&#8217;s posts') );
		$this->WP_Widget('mytheme_archives', __('MyTheme Archives'), $widget_ops);
	}
{% endhighlight %}

Notice that we not only changed the function name, but we changed the parameters to the WP_Widget call.  We did this for the same reason explained above (this is a "new" widget, and we want to be able to switch back to the old version).

<div>&nbsp;</div>

For this next step, we are going to modify the <i>widget()</i>, <i>form()</i>, and <i>update()</i> calls.  These are the functions that display the actual widget in the sidebar, and also display the widget details in the WordPress admin console.  For this new widget, I am always going to display the post count, and I'm never going to display the archive results as a dropdown, so I can remove a few of the variables that are in the default archive widget ($c, $count, $d, $dropdown).  To achieve this, you can modify <b>functions-widgets.php</b> like so:

Before changes:

{% highlight php linenos linenostart=15 %}
	function widget( $args, $instance ) {
		extract($args);
		$c = $instance['count'] ? '1' : '0';
		$d = $instance['dropdown'] ? '1' : '0';
		$title = apply_filters('widget_title', empty($instance['title']) ? __('Archives') : $instance['title']);
 
		echo $before_widget;
		if ( $title )
			echo $before_title . $title . $after_title;
 
		if ( $d ) {
?>
		<select name="archive-dropdown" onchange='document.location.href=this.options[this.selectedIndex].value;'> <option value=""><?php echo esc_attr(__('Select Month')); ?></option> <?php wp_get_archives(apply_filters('widget_archives_dropdown_args', array('type' => 'monthly', 'format' => 'option', 'show_post_count' => $c))); ?> </select>
<?php
		} else {
?>
		<ul>
		<?php wp_get_archives(apply_filters('widget_archives_args', array('type' => 'monthly', 'show_post_count' => $c))); ?>
		</ul>
<?php
		}
 
		echo $after_widget;
	}
 
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$new_instance = wp_parse_args( (array) $new_instance, array( 'title' => '', 'count' => 0, 'dropdown' => '') );
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['count'] = $new_instance['count'] ? 1 : 0;
		$instance['dropdown'] = $new_instance['dropdown'] ? 1 : 0;
 
		return $instance;
	}
 
	function form( $instance ) {
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'count' => 0, 'dropdown' => '') );
		$title = strip_tags($instance['title']);
		$count = $instance['count'] ? 'checked="checked"' : '';
		$dropdown = $instance['dropdown'] ? 'checked="checked"' : '';
?>
		<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label> <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>
		<p>
			<input class="checkbox" type="checkbox" <?php echo $count; ?> id="<?php echo $this->get_field_id('count'); ?>" name="<?php echo $this->get_field_name('count'); ?>" /> <label for="<?php echo $this->get_field_id('count'); ?>"><?php _e('Show post counts'); ?></label>
			<br />
			<input class="checkbox" type="checkbox" <?php echo $dropdown; ?> id="<?php echo $this->get_field_id('dropdown'); ?>" name="<?php echo $this->get_field_name('dropdown'); ?>" /> <label for="<?php echo $this->get_field_id('dropdown'); ?>"><?php _e('Display as a drop down'); ?></label>
		</p>
<?php
	}
}
 
?>
{% endhighlight %}

After changes:

{% highlight php linenos linenostart=15 %}
	function widget( $args, $instance ) {
		extract($args);
		$title = apply_filters('widget_title', empty($instance['title']) ? __('Archives') : $instance['title']);
 
		echo $before_widget;
		if ( $title )
			echo $before_title . $title . $after_title;
 ?>
		<ul>
			// We will complete this in the next step
		</ul>
<?php
		}
 
		echo $after_widget;
	}
 
	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);

		return $instance;
	}
 
	function form( $instance ) {
		//Defaults
		$instance = wp_parse_args( (array) $instance, array( 'title' => '') );
		$title = esc_attr( $instance['title'] );
?>
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e( 'Title:' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
		</p>
<?php
	}
}
 
?>
{% endhighlight %}

Now there's one final step.  We need to actually display the archives.  To do that, we need to modify the <i>widget()</i> function.  In the last step, we were left with the following line:

{% highlight php linenos linenostart=23 %}
		<ul>
			// We will complete this in the next step
		</ul>
{% endhighlight %}

We are now going to complete this block of code.  Open up <b>"/wp-includes/general-template.php"</b> and copy lines 799-825.  Paste them into line 24 of <b>functions-widgets.php</b> which will give you:

{% highlight php linenos linenostart=23 %}
		<ul>
		if ( 'monthly' == $type ) {
			$query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts $join $where GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC $limit";
			$key = md5($query);
			$cache = wp_cache_get( 'wp_get_archives' , 'general');
			if ( !isset( $cache[ $key ] ) ) {
				$arcresults = $wpdb->get_results($query);
				$cache[ $key ] = $arcresults;
				wp_cache_add( 'wp_get_archives', $cache, 'general' );
			} else {
				$arcresults = $cache[ $key ];
			}
			if ( $arcresults ) {
				$afterafter = $after;
				foreach ( (array) $arcresults as $arcresult ) {
					$url = get_month_link( $arcresult->year, $arcresult->month );
					$text = sprintf(__('%1$s %2$d'), $wp_locale->get_month($arcresult->month), $arcresult->year);
					if ( $show_post_count )
						$after = '&nbsp;('.$arcresult->posts.')' . $afterafter;
					$output .= get_archives_link($url, $text, $format, $before, $after);
				}
			}
		</ul>
{% endhighlight %}

The first thing you'll notice is the <b>if ( 'monthly' == $type )</b> statement.  We can remove this clause, because the "custom archive plugin" will only show archives by month (I wanted to keep it simple- no need for other display types).  Also, this code is using a few global variables ($wpdb, $wp_locale) that aren't yet being used properly in our version of the <i>widget()</i> function.  We need to modify <b>functions-widgets.php</b> again to have the following line which will declare our global variables for use inside the function:

{% highlight php linenostart=15 %}
	function widget( $args, $instance ) {
		global $wpdb, $wp_locale;
		extract($args);
{% endhighlight %}

Also, when we copied code the first time, we didn't copy a few of the variables being used ($where and $join).  Modify <b>functions-widgets.php</b> like so (adding lines 25-27):

{% highlight php linenos linenostart=24 %}
		<ul>
		//filters
		$where = apply_filters('getarchives_where', "WHERE post_type = 'post' AND post_status = 'publish'", $r );
		$join = apply_filters('getarchives_join', "", $r);

		$query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM $wpdb->posts $join $where GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC $limit";
{% endhighlight %}

Another thing about the code we copied: we can ignore the $post_count variable (since we are *always* showing post counts). We also want to make sure the post count shows up inside our anchor tag.  To accomplish that, we can change:

{% highlight php %}
$url = get_month_link( $arcresult->year, $arcresult->month );
$text = sprintf(__('%1$s %2$d'), $wp_locale->get_month($arcresult->month), $arcresult->year);
if ( $show_post_count )
	$after = '&nbsp;('.$arcresult->posts.')' . $afterafter;
$output .= get_archives_link($url, $text, $format, $before, $after);
{% endhighlight %}

to:

{% highlight php %}
$url = get_month_link( $arcresult->year, $arcresult->month );
$text = sprintf(__('%1$s %2$d'), $wp_locale->get_month($arcresult->month), $arcresult->year);
$text .= '&nbsp;('.$arcresult->posts.')' . $afterafter;
$output .= get_archives_link($url, $text, $format, '<li>', '</li>');
{% endhighlight %}

Also add the correct output line before the <i>widget()</i> function ends:

{% highlight php %}
		echo '<ul>' . $output . '</ul>';
		echo $after_widget;
{% endhighlight %}


Our hacked/modified version is almost complete.  The last thing I'm going to do is register the new archive widget (and unregister the default version).  Do so by adding the following <i>mytheme_widget_init()</i> function to <b>functions-widgets.php</b>, then calling it:

{% highlight php linenos linenostart=80 %}
/**
 * Registering MyTheme Widgets
 * Removing a few default WordPress Widgets
 *
 * @since 1.0
 */
function mytheme_widget_init() {
	// unregister some default widgets
	unregister_widget('WP_Widget_Archives');

	// register my own widgets
	register_widget('MyTheme_Widget_Archives');
}

add_action('widgets_init', 'mytheme_widget_init');
{% endhighlight %}


After completing the above steps, your post count will show up inside the anchor tag.  One final (optional) step is modifying the <b>style.css</b> file so archive links are highlighted when hovering.  For the "classic-modified" theme, I'm going to add:

{% highlight css linenos linenostart=371 %}
/* Custom styles for archive widget */
.widget_archive,
.widget_archive ul,
.widget_archive ul li,
.widget_archive ul li ul,
.widget_archive ul li ul li { border:0px; margin:0px; padding:0px; list-style: none; display:block; }
.widget_archive ul li a,
.widget_archive ul li ul li a { display: block; border-bottom: 1px dotted #666; margin:0px; padding:0px; }
.widget_archive ul li a,
.widget_archive ul li a:link,
.widget_archive ul li a:visited,
.widget_archive ul li a:hover,
.widget_archive ul li a:active { text-decoration:none; }
.widget_archive ul li a:hover { background:#eee; }
{% endhighlight %}

<h4 style="text-decoration:underline">Comparison of default archive widget behavior vs. modified version</h4>

<div class="clearfix" style="width:600px;margin:0 auto;">
	<div class="left">
		<p><b>BEFORE (default archive widget):</b></p>
		<img src="/images/posts/2009/09/22/classic-screen.gif" alt="BEFORE (default archive widget)" title="Classic Theme Screenshot" width="212" height="102" />
	</div>
	<div class="right">
		<p><b>AFTER (modified archive widget):</b></p>
		<img src="/images/posts/2009/09/22/classic-modified-screen.gif" alt="AFTER (modified archive widget)" title="Classic-Modified Theme Screenshot" width="212" height="102" />
	</div>
</div>
