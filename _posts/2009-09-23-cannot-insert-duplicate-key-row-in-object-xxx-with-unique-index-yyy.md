---
layout: post
title: Cannot insert duplicate key row in object 'xxx' with unique index 'yyy'
categories:
  - SQL
tags:
  - Database
  - SQL
  - SQL Server 2005
type: post
status: publish
---

The other month I ran into an issue when trying to
run a simple update statement on a table in SQL Server 2005.
The error I was receiving was:

**Cannot insert duplicate key row in object 'MyProductView' with unique index 'IXCL_MyProductView'**

_NOTE: I've changed the names of the views/tables/columns that were actually used, but you should get the idea._

The update statement that threw the error looked like this:

```sql
UPDATE Products SET active = 1 WHERE id = 200
```

**MyProductView** was basically just a way to join a few of
the product related tables (ie: **Sizes**, **Colors**, **Inventory**, etc).

The index on **MyProductView** that was causing the constraint violation looked something like this:

```sql
CREATE UNIQUE CLUSTERED INDEX IXCL_MyProductView ON MyProductView
(
	product_id,
	color_id,
	size_id,
	inventory_id,
	currency_id
}
```

Notice the **active** flag/column is not in the clustered
index (so updating that column on the **Products** table should
not change a row in my view that would violate the unique constraint
above). Also, the **active** column was not in any of the join
clauses for the **MyProductView**, so no rows should've been added
or deleted from the view after running the update statement.

To confirm the validity of the **IXCL_MyProductView** constraint, I could run:

```sql
SELECT
	product_id, color_id, size_id, inventory_id, currency_id, COUNT(1) AS confirmConstraint
FROM
	MyProductView
GROUP BY
	product_id, color_id, size_id, inventory_id, currency_id
```

As long as the **IXCL_MyProductView** constraint was in place,
the **confirmConstraint** column could only have a value of 1.

I could not figure out why running:

```sql
UPDATE Products SET active = 1 WHERE id = 200
```

would cause a problem. If the query would complete successfully,
the constraint would still be valid. In fact, I could run the same
query in production just fine. Also, the other developers could run
the query just fine on their local DBs. I was the only one who was
running into this constraint violation (and I had the same data in my
database as the other databases had). After bringing this up with our
DBA, he had no idea why the constraint violation would be occur.
I wondered if I needed to wrap the UPDATE statement in a TRANSACTION COMMIT
block, but our DBA said I shouldn't have to.

After thinking about it for a minute, he asked what version of SQL Server 2005
I was using. It turned out I was not running the same service pack level as the
other developers (and what was in production).

I was running **"SQL Server 2005 - Developer's Edition (9.0 RTM)"**. I then
upgraded to Service Pack 2: **"SQL Server 2005 - Developer's Edition (9.0 SP2)"**,
and the issue disappeared. I was able to run my UPDATE statement without error.
