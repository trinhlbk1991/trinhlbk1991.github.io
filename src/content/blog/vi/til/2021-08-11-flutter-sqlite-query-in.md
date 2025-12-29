---
title: "Flutter - Sqflite Truy Vấn Giá Trị Khớp Với Danh Sách"
date: 2021-08-11
categories: ["til"]
tags: ["Flutter","Sqflite","Database"]
summary: "Tìm hiểu cách truy vấn các giá trị khớp với danh sách bằng toán tử IN trong Sqflite cho cơ sở dữ liệu Flutter."
toc: true
comments: true
---

Như bạn có thể biết, để truy vấn các giá trị khớp với bất kỳ giá trị nào trong danh sách được xác định trước, bạn có thể sử dụng toán tử `IN`.

Ví dụ:

```SQL
SELECT *
FROM categories
WHERE id IN (1, 2, 3, 4)
```

Nó khá dễ dàng với SQL thuần túy nhưng làm thế nào để đạt được điều đó khi sử dụng `Sqflite`?

```dart
final ids = [1, 2, 3, 4]
db.query(
    'categories',
    where: "id IN (${ids.map((_) => '?').join(', ')})",
    whereArgs: ids,
);
```

Điểm chính là tạo đủ số lượng placeholder `?` trong câu lệnh `where` của bạn và bạn đã hoàn thành!

Chúc bạn code vui vẻ! 💻