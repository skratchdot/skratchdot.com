#
# Open Electribe Editor HTML Footer
#
OEE_FOOTER='
<div style="padding:20px 0;">
	<div style="float:left">
		<a href="//skratchdot.com/projects/open-electribe-editor/" onclick="window.top.location=this.href">
			Open Electribe Editor Project Page
		</a>
	</div>
	<div style="float:right">
		<a href="//skratchdot.com/">
			skratchdot.com
		</a>
	</div>
	<div style="clear:both"></div>
</div>
<!-- Google Analytics -->
<script type="text/javascript">
//<![CDATA[
	var _gaq = _gaq || [];
	_gaq.push(["_setAccount", "UA-10768188-1"]);
	_gaq.push(["_trackPageview"]);
	(function() {
		var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
		ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
		var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
	})();
//]]>
</script>
'

#
# RIFF WAV for Java HTML Footer
#
RIFFWAV_FOOTER='
<div style="padding:20px 0;">
	<div style="float:left">
		<a href="//skratchdot.com/projects/riff-wav-for-java/" onclick="window.top.location=this.href">
			RIFF WAV for Java Project Page
		</a>
	</div>
	<div style="float:right">
		<a href="//skratchdot.com/">
			skratchdot.com
		</a>
	</div>
	<div style="clear:both"></div>
</div>
<!-- Google Analytics -->
<script type="text/javascript">
//<![CDATA[
	var _gaq = _gaq || [];
	_gaq.push(["_setAccount", "UA-10768188-1"]);
	_gaq.push(["_trackPageview"]);
	(function() {
		var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
		ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
		var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
	})();
//]]>
</script>
'

#
# Generate Open Electribe Editor docs
#
javadoc \
-d \
./_javadocs/projects/open-electribe-editor/javadocs \
-sourcepath \
../open-electribe-editor/com.skratchdot.electribe.audioplayer/src:\
../open-electribe-editor/com.skratchdot.electribe.fileexplorer/src:\
../open-electribe-editor/com.skratchdot.electribe.model.esx/src:\
../open-electribe-editor/com.skratchdot.electribe.model.esx.edit/src:\
../open-electribe-editor/com.skratchdot.electribe.model.esx.editor/src:\
../open-electribe-editor/com.skratchdot.electribe.model.esx.preferences/src:\
../open-electribe-editor/com.skratchdot.riff.wav/src \
-subpackages com.skratchdot \
-doctitle "Open Electribe Editor" \
-header "Open Electribe Editor" \
-footer "Open Electribe Editor" \
-bottom "$OEE_FOOTER"


#
# Generate RIFF WAV for Java docs
#
javadoc \
-d \
./_javadocs/projects/riff-wav-for-java/javadocs \
-sourcepath \
../open-electribe-editor/com.skratchdot.riff.wav/src \
-subpackages com.skratchdot \
-doctitle "RIFF WAV for Java" \
-header "RIFF WAV for Java" \
-footer "RIFF WAV for Java" \
-bottom "$RIFFWAV_FOOTER"

