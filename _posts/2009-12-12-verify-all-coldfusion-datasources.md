---
layout: post
title: Verify All ColdFusion DataSources
categories:
  - ColdFusion
tags:
  - adminapi
  - ColdFusion
  - datasources
---

Recently I was asked how to programmatically verify ColdFusion DataSources.
I came up with a few methods of doing so. Each have their pros and cons.

### Method #1 : Try/Catch using cfquery

**PROS:**

- Can test for "datasource" specific behavior by using a custom
  cfquery (ie. **"SELECT 1"** vs. **"SELECT name FROM Customers"**).
  If you do this, the query may not work for other datasources, thereby not
  actually testing the validity of the datasource (a CON).

**CONS:**

- Uses try/catch.
- Does not work with all datasources. I don't know of a cfquery that will work for all datasources / DBs / etc

**NOTES:**

This is my least favorite, because I couldn't come up with a cfquery to
test _all_ datasources. It will work for some datasources, but not all.

**SOURCE:**

```cfm linenos
<cffunction name="verifyDsnList1" output="true" returntype="void">
	<cfargument name="list" type="string" required="true" />
	<cfargument name="delimiter" type="string" required="false" default="," />
	<cfset var local = StructNew() />
	<cfoutput>
		<hr />
		<b><u>veriftyDsnList1</u></b>
		<cfloop list="#arguments.list#" index="local.currentName">
			<cftry>
				<hr />
				<cfquery name="local.qVerifyDatasource" datasource="#local.currentName#">
					SELECT 1
				</cfquery>
				<cfif local.qVerifyDatasource.RecordCount gt 0>
					DATASOURCE: #local.currentName# [VERIFIED=true]
				<cfelse>
					DATASOURCE: #local.currentName# [VERIFIED=false]
				</cfif>
				<cfcatch>
					DATASOURCE: #local.currentName# [VERIFIED=false] [ERROR: #cfcatch.message#]
				</cfcatch>
			</cftry>
		</cfloop>
		<hr />
	</cfoutput>
</cffunction>
```

### Method #2: Try/Catch using the DataSourceService verifyDatasource() method.

**PROS:**

- Will work for all datasources.
- Shows "error" specific messaging that might help debug why a datasource isn't working.

**CONS:**

- Uses try/catch.

**SOURCE:**

```cfm linenos
<cffunction name="verifyDsnList2" output="true" returntype="void">
	<cfargument name="list" type="string" required="true" />
	<cfargument name="delimiter" type="string" required="false" default="," />
	<cfset var local = StructNew() />
	<cfset local.dsService = CreateObject("java", "coldfusion.server.ServiceFactory").DataSourceService />
	<cfoutput>
		<hr />
		<b><u>veriftyDsnList2</u></b>
		<cfloop list="#arguments.list#" index="local.currentName">
			<cftry>
				<hr />
				<cfif local.dsService.verifyDatasource(local.currentName)>
					DATASOURCE: #local.currentName# [VERIFIED=true]
				<cfelse>
					DATASOURCE: #local.currentName# [VERIFIED=false]
				</cfif>
				<cfcatch>
					DATASOURCE: #local.currentName# [VERIFIED=false] [ERROR: #cfcatch.message#]
				</cfcatch>
			</cftry>
		</cfloop>
		<hr />
	</cfoutput>
</cffunction>
```

### Method #3: Admin API verifyDSN() call

**PROS:**

- Will work for all datasources.
- Doesn't use try/catch.

**CONS:**

- Need to pass in cfide password. This should never be hardcoded, or kept in plain text.
- Will never output "error" specific text (only ever displays true or false).

**SOURCE:**

```cfm linenos
<cffunction name="verifyDsnList3" output="true" returntype="void">
	<cfargument name="cfide_password" type="string" required="true" />
	<cfargument name="list" type="string" required="true" />
	<cfargument name="delimiter" type="string" required="false" default="," />
	<cfset var local = StructNew() />
	<cfset local.admin = createObject("component","cfide.adminapi.administrator").login(arguments.cfide_password) />
	<cfset local.dsObj = createObject("component","cfide.adminapi.datasource") />
	<cfoutput>
		<hr />
		<b><u>veriftyDsnList3</u></b>
		<cfloop list="#arguments.list#" index="local.currentName">
			<hr />
			DATASOURCE: #local.currentName# [VERIFIED=#local.dsObj.verifyDSN(local.currentName)#]
		</cfloop>
		<hr />
	</cfoutput>
</cffunction>
```

### Helper Function:

Here's a helper function that will return a sorted list of all configured datasource names:

```cfm linenos
<cffunction name="getDatasourceList" output="false" returntype="string">
	<cfargument name="sort_type" type="string" required="false" default="textnocase" hint="Optional. See livedocs for ListSort()." />
	<cfargument name="sort_order" type="string" required="false" default="asc" hint="Optional. See livedocs for ListSort()." />
	<cfargument name="delimiter" type="string" required="false" default="," hint="Optional. See livedocs for ListSort()." />
	<cfset var dsService = CreateObject("java", "coldfusion.server.ServiceFactory").DataSourceService />
	<cfset var sDatasources = dsService.getDatasources() />
	<cfset var dsList = StructKeyList(sDatasources, arguments.delimiter) />
	<cfreturn ListSort(dsList, arguments.sort_type, arguments.sort_order, arguments.delimiter) />
</cffunction>
```

### Testing all 3 methods:

Here's a small script to test all the functions from this post.
For this to work correctly, you'll need to set the correct CFIDE password.

```cfm linenos
<cfset my_cfide_password = "admin" />
<cfset my_datasource_list = getDatasourceList() />

<cfoutput>
	#verifyDsnList1(my_datasource_list)#
	<br />
	#verifyDsnList2(my_datasource_list)#
	<br />
	#verifyDsnList3(my_cfide_password, my_datasource_list)#
	<br />
</cfoutput>
```
