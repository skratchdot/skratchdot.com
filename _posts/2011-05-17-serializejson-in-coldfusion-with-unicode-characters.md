---
layout: post
title: SerializeJSON() in ColdFusion with Unicode Characters
categories:
  - ColdFusion
tags:
  - ColdFusion
  - Javascript
---

This weekend I read an interesting blog post called [JSON: The JavaScript subset that isn't](http://timelessrepo.com/json-isnt-a-javascript-subset)
and decided to test ColdFusion's SerializeJSON() function to see if the "bug" existed there.
It does. To reproduce, you can create a .cfm page that contains the following HTML/CF code:

```cfm
<script type="text/javascript">
    var test = #SerializeJSON("test" & chr(8232))#;
</script>
```

To "fix" the bug, you can replace SerializeJSON() with SafeSerializeJSON() like this:

```cfm
<script type="text/javascript">
    var test = #SafeSerializeJSON("test" & chr(8232))#;
</script>
```

The SafeSerializeJSON() function looks like this:

```cfm
<cffunction name="SafeSerializeJSON" output="false" access="private" returntype="string">
    <cfargument name="obj" type="any" required="true" />
    <cfargument name="serializeQueryByColumns" type="boolean" required="false" default="false" />
    <cfset var jsonOutput = SerializeJSON(arguments.obj, arguments.serializeQueryByColumns) />
    <cfset jsonOutput = Replace(jsonOutput, chr(8232), "\u2028", "all") />
    <cfset jsonOutput = Replace(jsonOutput, chr(8233), "\u2029", "all") />
    <cfreturn jsonOutput />
</cffunction>
```

I've created a [gist](https://gist.github.com/975802) that explores the issue in slightly more detail:

- [json.cfm](https://gist.github.com/975802#file_json.cfm)
- [json2.cfm](https://gist.github.com/975802#file_json2.cfm)
