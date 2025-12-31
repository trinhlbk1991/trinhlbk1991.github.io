---
title: "Tại Sao Phòng Leo Núi Trong Nhà Lại Nhiều Software Engieer Dữ Vậy?"
date: 2025-12-23
categories: ["personal"]
tags: ["Personal", "Climbing"]
summary: "Bouldering không chỉ là môn thể thao, nó còn là lập trình phiên bản thể lực!"
toc: true
comments: true
image: "/assets/images/personal/me-climbing.jpg"
---

Tính ra cũng mấy năm rồi mình không viết gì trên [Iced Tea Labs](https://icedtealabs.com). Một trong những lý do chính là mình không có đủ thời gian (lại lý do lý trấu 😂).

Trong lúc không có thời gian viết blog, mình đã làm quen với bộ môn leo núi trong nhà (bouldering) tại một trong những phòng leo xịn xò nhất Sài Gòn - [Vertical District](https://verticaldistrict.vn/)! Và mình đã thấy một điều rất thú vị: phòng leo khá nhiều anh chị em *lập trình viên*.

Lúc đầu mình cũng khá ngạc nhiên lẫn thắc mắc. Nhưng càng leo, thì mình càng nhận ra lý do mà bouldering thu hút dân dev là vì nó khôg chỉ là một môn thể thao... mà nó còn là **lập trình phiên bản thể lực**.

<img src="/assets/images/personal/me-climbing.jpg"  alt="Tôi đi leo ở Vertical District để trốn chạy thực tại"/>

## The "Problems"

Trong bouldering, các đường leo được gọi là **"boulder problem"** - đây thật sự là "vấn đề" mà bạn cần phải giải quyết.

Tương tự trong lập trình, "vấn đề" sẽ được định nghĩa rõ ràng bằng những yêu cầu cũng như ràng buộc:
*   **Vị trí bắt đầu:** Bạn sẽ phải bắt đầu bằng những mấu (hold) cụ thể, được đánh dấu bằng băng dán màu. Tuỳ quy định mỗi phòng leo, như ở Vertical District, bạn sẽ phải dùng 2 tay chạm vào mấu bắt đầu trước khi bắt đầu leo.
*   **Vị trí kết thúc:** Hai tay phải chạm vào mấu kết thúc trong trạng thái "controlled" - cơ thể bạn phải ổn định để có thể được xem là hoàn thành đường leo.
*   **Ràng buộc:** Bạn chỉ có thể dùng các mấu leo cùng màu.

<img src="/assets/images/personal/ifsc.jpg"  alt="Các băng dán sẽ dùng để đánh dấu vị trí bắt đầu, mỗi băng dán là 1 chi của bạn, tay chân tuỳ thích."/>

Khi mới bắt đầu leo, bạn sẽ thường cố dùng sức để "giải quyết" đường leo đó - điều này giống như một Junior Dev sử dụng brute-force để giải quyết vấn đề. Sẽ chạy được, nhưng không tối ưu. Bạn sẽ nhanh chóng cạn hết sức giống như máy tính sẽ cạn resource khi lượng dữ liệu quá lớn. Đó là lúc bạn cần tìm một "thuật toán" tối ưu hơn.

## The "Beta"

Trong bouldering, "Beta" là chuỗi động tác cụ thể mà bạn cần thực hiện để "send" (hoàn thành) đường leo - giống như trong lập trình mình có thuật toán vậy.

Và mình nhận ra một điều: các bước để giải quyết một boulder problem gần như giống hệt với việc debug một app bị crash:
1.  **Run the code:** Bạn bắt đầu thử đường leo.
2.  **Runtime exception:** Bạn té sấp mặt!
3.  **Analyze the logs:** Bạn hoài nghi về beta của mình: "Sao lại té chỗ đó? Chân để sai mấu?"
4.  **Patch the bug:** Bạn nghĩ ra beta mới: "Ok, giờ sẽ toehook để không bị xoay người ra!"
5.  **Re-deploy:** Thử leo lại.

Các bước này sẽ lặp lặp lại cho đến khi bạn hoàn thành đường leo (hoặc không 🙂‍↔️).

Và khi bạn không thể tìm ra lý do tại sao mình không thể send? Cộng đồng leo núi luôn sẵn sàng chia sẻ beta với bạn - giống như việc bạn đi hỏi StackOverflow á.

<img src="/assets/images/personal/community.webp"  alt="Cộng đồng leo núi - vừa support vừa 'toxic' nhưng bao vui"/>

## Giải Pháp "Tối Ưu"

Trong bouldering, việc send đường leo không phải là mục tiêu duy nhất. Càng leo nhiều, bạn càng muốn leo một cách *hiệu quả* để tiết kiệm sức lực, thay vì chỉ dùng sức leo vô tội vạ.

Đôi khi, chỉ cần xoay hông một chút hoặc duỗi thẳng tay ra có thể tạo ra sự khác biệt rất lớn. Nó giống như việc refactor code của bạn từ độ phức tạp **O(n²)** xuống **O(n)**.

<img src="/assets/images/personal/dropknee.jpg"  alt="Dropknee là một trong những kỹ thuật giúp bạn leo nhẹ nhàng hơn"/>

## Tại Sao Software Engineer Lại Thích Leo Núi?

Ngoài những điểm tương đồng giữa leo núi và lập trình, mình nghĩ lý do mà nhiều anh chị em dev "nghiện" phòng leo là vì **feedback loop**.

Trong phát triển phần mềm, chúng ta build tính năng, fix bug, và refactor code, thường phải đợi hàng tuần mới có feedback từ người dùng.

Trong bouldering, feedback là ngay lặp tức và không thể "chống cự" được! Bạn hoặc là nắm được mấu đá, hoặc là té sml. Trọng lực không quan tâm đến edge case của bạn. Khi send được đường leo, chạm tới đỉnh làm một cảm giác chinh phục, thoả mãn như khi fix được bug đã làm bạn đắm đuối cả ngày - hơn nữa là bạn thật sự "cầm nắm" được cái đỉnh đó - ý là phê hơn nữa!

***

Mình quyết định sẽ/đã quay lại blogging tiếp cho [Iced Tea Labs](https://icedtealabs.com), không chỉ với tâm thế của một indie hacker mà còn với "tư duy của người leo núi": phân tích, thử nghiệm, thất bại, điều chỉnh, và hoàn thành.

Hẹn gặp các bạn trên tường leo (và trên đây - Iced Tea Labs)!
