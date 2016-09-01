---
layout: post
title:  Cờ Caro Có AI
date: 2014-01-27 11:05
author: admin
comments: true
categories: [blog]
tags: [C Sharp]
---

<h2><strong>I. </strong><strong>Giới thiệu bài toán:</strong></h2>
Cờ ca rô là một loại cờ cổ xưa của Trung Quốc, là một trò chơi bàn cờ theo chiến thuật trừu tượng.

Cờ ca rô trong tiếng Hàn Quốc là <em>omok</em>, tiếng Trung là <em>wǔzǐqí, </em>trong tiếng Nhật là <em>gomoku narabe</em> và trong tiếng Anh là <em>Connect 5</em>…

Hai bên lần lượt đi các nước cờ. Người thắng là người có được 5 quân liên tục theo hàng ngang, dọc hoặc chéo.

<strong>II. </strong><strong>Giao diện và cấu trúc chương trình</strong>

<img class="aligncenter" src="http://d.f6.photo.zdn.vn/upload/original/2011/11/22/15/12/13219495611208985763_574_574.jpg" alt=""/>

<img class="aligncenter" src="http://d.f6.photo.zdn.vn/upload/original/2011/11/22/15/12/1321949552973826042_574_574.jpg" alt="" />

- Chương trình có các chức năng:
<ul>
<ul>
	<li>New game: Mặc định trong lần chơi đầu tiên máy sẽ đi trước, sau này ai thắng sẽ đi sau.</li>
	<li>Undo</li>
	<li>Save, Load.</li>
</ul>
</ul>
- Bàn cờ được tạo thành bằng cách vẽ các đường thẳng ngang dọc trên form.

- Hình ảnh các quân cờ được load từ file png.

- Các button là các label có hình nền thay đổi khi hover cũng như click chuột.

- Chương trình gồm các class
<ul>
<ul>
	<li>CaroChess.cs: chứa các biến, phương thức phục vụ cho việc xử lí các thao tác đánh cờ, kiểm tra kết thúc, xử lí AI (tính hàm đánh giá, xác định nước đi cho máy), save và load…</li>
	<li>Graphic.cs: vẽ bàn cờ và quân cờ.</li>
</ul>
</ul>
<h2><strong>III. </strong><strong>Thuật toán AI</strong></h2>
- <strong><em><span style="text-decoration: underline;">Hàm đánh giá:</span></em></strong>

Có 2 ma trận điểm:
<pre>public int[ ] DScore = new int[5] { 0, 1, 9, 81, 729 };//Mảng điểm chặn
public int[ ] AScore = new int[5] { 0, 2, 18, 162, 1458 };//Mảng điểm tấn công</pre>
Tiến hành quét một block 5 ô theo 4 hướng là dọc, ngang, chéo lên, chéo xuống, đếm số quân cờ mỗi bên và tiến hành cộng điểm cho các ô trống khi trong block 5 ô đó chỉ có toàn quân ta, hoặc toàn quân địch.
<ul>
<ul>
	<li>Nếu có n quân ta thì các ô trống được cộng Ascore[n] điểm.</li>
	<li>Nếu có n quân địch thì các ô trống được cộng Dscore[n] điểm.</li>
</ul>
</ul>
Vd:
<table border="0" width="101" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="bottom" nowrap="nowrap" width="19"></td>
<td valign="bottom" nowrap="nowrap" width="21">x</td>
<td valign="bottom" nowrap="nowrap" width="21">x</td>
<td valign="bottom" nowrap="nowrap" width="22">x</td>
<td valign="bottom" nowrap="nowrap" width="19"></td>
</tr>
</tbody>
</table>
Hai ô trống sẽ có Ascore[3] = 81

Như thế điểm các ô trống sẽ được cộng dồn (do một ô được quét 5 lần mỗi chiều). Điều này có ý nghĩa trong việc xác định các nước đi ăn đôi, ăn ba.

- <strong><em><span style="text-decoration: underline;">Hàm tìm nước đi cho máy:</span></em></strong>

Đầu tiên đánh giá bàn cờ và chọn ra 3 ô trống có điểm cao nhất, tiến hành đánh thử.

Trong mỗi lượt đánh thử cũng tiến hành đánh giá bàn cờ và chọn ra 3 ô trống cao điểm nhất của người để đánh trả lại. Độ sâu tối đa là 11.

Nếu tìm thấy nước đi dẫn tới chiến thắng thì đánh theo nước đó.

Không thì đánh vào ô có điểm cao nhất!
<h2><strong>IV. </strong><strong>Tham khảo</strong></h2>
[1] Giáo trình Trí Tuệ Nhân Tạo ĐH Sư Phạm Kỹ Thuật, <em>Dương Minh Trí</em>

[2] http://congdongcviet.com
<h2 style="text-align: center;"><strong>Download Source Code</strong></h2>

<p style="text-align: center;">Password unlock: khanhtrinh</p>
<p style="text-align: center;"><a href="http://www.mediafire.com/?l68i9xjy6yi6tqz">http://www.mediafire.com/?l68i9xjy6yi6tqz</a></p>
<p style="text-align: center;"></p>
