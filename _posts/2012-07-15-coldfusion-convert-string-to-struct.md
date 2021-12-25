---
layout: post
title: 'Coldfusion: Convert String To Struct'
published: true
categories:
  - ColdFusion
tags:
  - ColdFusion
---

The other day I had the need to create a nested structure
based off of a key using dot notation.

Below is the function I came up with:

```cfm
<cfscript>

private struct function convertStringToStruct(required string key, required any value, string delimiter = ".") {
    var obj = StructNew();
    var first = ListFirst(arguments.key, arguments.delimiter);
    var rest = ListRest(arguments.key, arguments.delimiter);

    if (Len(rest)) {
        obj[first] = convertStringToStruct(rest, arguments.value, arguments.delimiter);
    } else {
        obj[first] = arguments.value;
    }

    return obj;
}

</cfscript>
```

Here's a quick example usage:

```cfm
<cfscript>

	// Declare a struct. We will later append to this
	obj = StructNew();

	// Create a few top level keys
	obj["ab"] = "foo";
	obj["b"] = "bar";

	// Append a dynamically created structure
	StructAppend(obj, convertStringToStruct("a.b.c", "baz"), false);

	// Show our output
	WriteDump(obj);

</cfscript>
```

The output from the above example:

![cfdump output of convertStringToStruct() example](/images/posts/2012/07/15/cfdump.png)

Here is a gist containing the code:

[https://gist.github.com/3118727](https://gist.github.com/3118727)
