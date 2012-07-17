#!/bin/bash

function get_page {
	local dir_name="$1"
	local file_name="$2"
	local remote_url="$3"
	local layout="$4"
	local title="$5"
	local hide_comments="$6"
	local file="$1/$2"

	## Make sure our directory exists
	if [ ! -d "$dir_name" ]; then
		mkdir -p "$dir_name"
	fi
	
	## Output YAML at the top of our file
	echo "---" > "$file"
	echo "layout: \"$layout\"" >> "$file"
	echo "title: \"$title\"" >> "$file"
	echo "---" >> "$file"

	## Grab the remote file, and append it to our local file
	curl "$remote_url" >> "$file"
}

# Start grabbing pages
get_page "./projects/open-electribe-editor" "index.md" "https://raw.github.com/skratchdot/open-electribe-editor/master/README.md" "page" "Open Electribe Editor" false

get_page "./projects/github-code-search.user.js" "index.md" "https://raw.github.com/skratchdot/github-code-search.user.js/master/README.md" "page" "Github - Code Search" false
get_page "./projects/github-fork-count.user.js" "index.md" "https://raw.github.com/skratchdot/github-fork-count.user.js/master/README.md" "page" "Github - Fork Count" false
get_page "./projects/github-repo-counts.user.js" "index.md" "https://raw.github.com/skratchdot/github-repo-counts.user.js/master/README.md" "page" "Github - Repo Counts" false
get_page "./projects/github-repo-filter-info.user.js" "index.md" "https://raw.github.com/skratchdot/github-repo-filter-info.user.js/master/README.md" "page" "Github - Repo Filter Info" false
get_page "./projects/github-pull-request-links.user.js" "index.md" "https://raw.github.com/skratchdot/github-pull-request-links.user.js/master/README.md" "page" "Github - Pull Request Links" false
get_page "./projects/github-twitter-link.user.js" "index.md" "https://raw.github.com/skratchdot/github-twitter-link.user.js/master/README.md" "page" "Github - Twitter Link" false

get_page "./projects/domFormat" "index.md" "https://raw.github.com/skratchdot/domFormat/master/README.md" "page" "domFormat" false
get_page "./projects/framecapture" "index.md" "https://raw.github.com/skratchdot/framecapture/master/README.md" "page" "framecapture" false
get_page "./projects/riff-wav-for-java" "index.md" "https://raw.github.com/skratchdot/riff-wav-for-java/master/README.md" "page" "RIFF Wav for Java" false

get_page "./projects/mesh" "index.md" "https://raw.github.com/skratchdot/mesh/master/README.md" "page" "mesh: MongoDB Extended Shell" false
get_page "./projects/mongodb-distinct-types" "index.md" "https://raw.github.com/skratchdot/mongodb-distinct-types/master/README.md" "page" "MongoDB - distinct-types.js" false
get_page "./projects/mongodb-flatten" "index.md" "https://raw.github.com/skratchdot/mongodb-flatten/master/README.md" "page" "MongoDB - flatten.js" false
get_page "./projects/mongodb-schema" "index.md" "https://raw.github.com/skratchdot/mongodb-schema/master/README.md" "page" "MongoDB - schema.js" false
get_page "./projects/mongodb-wild" "index.md" "https://raw.github.com/skratchdot/mongodb-wild/master/README.md" "page" "MongoDB - wild.js" false

exit