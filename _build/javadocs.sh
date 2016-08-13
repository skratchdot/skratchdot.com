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
<script>
	(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,"script","//www.google-analytics.com/analytics.js","ga");
	ga("create", "UA-10768188-1", "skratchdot.com");
	ga("require", "displayfeatures");
	ga("send", "pageview");
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
<script>
	(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,"script","//www.google-analytics.com/analytics.js","ga");
	ga("create", "UA-10768188-1", "skratchdot.com");
	ga("require", "displayfeatures");
	ga("send", "pageview");
</script>
'

#
# Generate Open Electribe Editor docs
#
javadoc \
-d \
./projects/open-electribe-editor/javadocs \
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
./projects/riff-wav-for-java/javadocs \
-sourcepath \
../open-electribe-editor/com.skratchdot.riff.wav/src \
-subpackages com.skratchdot \
-doctitle "RIFF WAV for Java" \
-header "RIFF WAV for Java" \
-footer "RIFF WAV for Java" \
-bottom "$RIFFWAV_FOOTER"
