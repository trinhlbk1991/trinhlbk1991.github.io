---
title: "Flutter - Sqflite Query Values Match Any Values In List"
date: 2021-08-11
categories: ["til"]
tags: ["Flutter","Sqflite","Database"]
toc: true
comments: true
---

As you may know, in order to query values that match any values in a predefined list, you can use the `IN` check.

For example:

```SQL
SELECT *
FROM categories
WHERE id IN (1, 2, 3, 4)
```

It's easy for raw SQL but how to achieve that using `Sqflite`?

```dart
final ids = [1, 2, 3, 4]
db.query(
    'categories',
    where: "id IN (${ids.map((_) => '?').join(', ')})",
    whereArgs: ids,
);
```

The main point is to generate enough `?` placeholders in your `where` statement and you're good to go!

Happy coding! 💻