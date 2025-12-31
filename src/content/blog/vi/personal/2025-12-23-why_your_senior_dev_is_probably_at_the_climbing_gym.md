---
title: "Tại Sao Phòng Leo Núi Trong Nhà Lại Toàn Là Software Engineer?"
date: 2025-12-23
categories: ["personal"]
tags: ["Personal", "Climbing", "Life of Dev"]
summary: "Bouldering không chỉ là môn thể thao, nó chính là lập trình phiên bản thể lực!"
toc: true
comments: true
image: "/assets/images/personal/me-climbing.jpg"
---

Tính ra cũng mấy năm rồi mình "lặn" mất tăm trên [Iced Tea Labs](https://icedtealabs.com). Lý do thì nhiều lắm, nhưng tóm lại là "bận sấp mặt với đời" (mà cũng có thể là lý do lý trấu 😂).

Trong khoảng thời gian "biến mất" khỏi bàn phím đó, mình đã kết thân với bộ môn leo núi trong nhà (bouldering) tại một trong những phòng leo xịn xò nhất Sài Gòn - [Vertical District](https://verticaldistrict.vn/)! Và mình phát hiện ra một sự thật cực thú vị: cái phòng leo này... **đông Software Engineer một cách bất thường**.

Ban đầu mình cũng thắc mắc "Ủa alo?". Nhưng càng leo (và càng té), mình càng ngộ ra lý do bouldering lại có sức hút mãnh liệt với dân Dev đến vậy. Vì nó không chỉ là thể thao... nó chính là **lập trình phiên bản thể lực**.

<img src="/assets/images/personal/me-climbing.jpg"  alt="Tôi đi leo ở Vertical District để trốn chạy deadline"/>

## The "Problems"

Trong bouldering, các đường leo được gọi là **"Boulder Problem"** - nghe quen không? Nó thật sự là một "vấn đề" cần bạn giải quyết, chứ không chỉ là leo cho vui.

Tương tự như một ticket trên Jira, một "problem" trên tường leo cũng có Requirements và Constraints rõ ràng:
*   **Start Position (Vị trí bắt đầu):** Bạn phải set-up cơ thể đúng tại các mấu (hold) được đánh dấu bằng băng dán (tape). Ở Vertical District, quy luật là 2 tay phải chạm vào mấu bắt đầu thì mới được tính là "Start".
*   **End Position (Vị trí kết thúc):** Hai tay phải chạm vào mấu kết thúc (Top) và giữ lại trong trạng thái "controlled" - tức là không được chới với, phải ổn định.
*   **Constraints (Ràng buộc):** Bạn chỉ được phép dùng các mấu leo cùng màu. Cấm "cheat" bằng cách đạp sang màu khác.

<img src="/assets/images/personal/ifsc.jpg"  alt="Các băng dán đánh dấu vị trí start - input đầu vào của bài toán."/>

Khi mới làm quen với bouldering, nhìn vào một problem, bạn thường cố dùng sức trâu để leo - giống hệt một **Junior Dev** cố gắng **brute-force** để giải bài toán. Code chạy được đấy, nhưng không tối ưu. Bạn sẽ nhanh chóng cạn kiệt năng lượng giống như server bị ngốn hết resource vậy. Đó là lúc bạn nhận ra mình cần một thuật toán xịn hơn.

## The "Beta"

Trong bouldering, **"Beta"** là thuật ngữ chỉ chuỗi các động tác cụ thể để "send" (hoàn thành) đường leo.

Và mình nhận ra, quy trình giải một boulder problem khá tương đồng với quy trình **Debug** một cái app đang crash:
1.  **Run the code:** Bạn thử đường leo lần đầu tiên (flash attempt).
2.  **Runtime Exception:** Bạn té sấp mặt!
3.  **Analyze the Logs:** Bạn tự vấn: "Sao lại té chỗ đó? Chân đặt sai hay trọng tâm bị lệch?"
4.  **Patch the Bug:** Bạn nảy ra beta mới: "Ok, lần này sẽ thử *Toe-hook* để người không bị văng ra (barndoor)!"
5.  **Re-deploy:** Thử beta mới.

Vòng lặp này cứ thế tiếp diễn cho đến khi bạn "send" được đường leo (hoặc là hết pin rồi đi về 🙂‍↔️).

Và khi bạn bí, cộng đồng leo núi luôn sẵn sàng "share beta" cho bạn - cảm giác y chang như lên **StackOverflow** tìm câu trả lời từ 1 cha người Ấn vậy.

<img src="/assets/images/personal/community.webp"  alt="Cộng đồng leo núi - nơi share 'source code' chạy bằng cơm."/>

## Giải Pháp "Tối Ưu"

Trong bouldering, leo tới đỉnh thôi chưa đủ. Càng leo lâu, bạn càng muốn leo một cách *hiệu quả*.

Thay vì dùng cơ bắp cuồn cuộn để kéo người lên, đôi khi chỉ cần xoay hông một chút hoặc duỗi thẳng tay là đã tiết kiệm được 50% sức lực. Sự khác biệt này giống như việc bạn refactor code từ độ phức tạp **O(n²)** xuống **O(n)** vậy.

Đó chính là "Clean Code" phiên bản vật lý. Đẹp, mượt, và tốn ít tài nguyên nhất.

<img src="/assets/images/personal/dropknee.jpg"  alt="Dropknee - kỹ thuật 'refactor' tư thế để tiết kiệm sức."/>

## Tại Sao Software Engineer Lại "Nghiện" Leo Núi?

Ngoài những điểm tương đồng về tư duy, mình nghĩ lý do chính khiến anh em dev mê mệt phòng leo là vì **Feedback Loop** (Vòng lặp phản hồi).

Trong làm phần mềm, chúng ta code feature, fix bug, deploy, rồi phải đợi cả tuần, cả tháng mới có số liệu hoặc feedback từ user. Cảm giác chờ đợi khá là mông lung.

Còn trong Bouldering? **Feedback là ngay lập tức.**

Bạn nắm được mấu đá, hoặc bạn té sml. Trọng lực không quan tâm đến Edge Case của bạn, cũng không nể mặt Senior hay Junior.

Khi bạn chạm được hai tay vào mấu Top, cái cảm giác dopamine nó bắn lên não y hệt như lúc fix được cái bug "khó đỡ" đã ám bạn suốt cả tuần - nhưng lần này bạn cảm nhận được chiến thắng đó bằng cả cơ bắp lẫn tinh thần. Phê hơn nhiều!

***

Mình đã quyết định quay lại viết blog trên [Iced Tea Labs](https://icedtealabs.com), không chỉ với tâm thế của một Indie Hacker mà còn với "tư duy leo núi": **Phân tích (Analyze) -> Thử nghiệm (Attempt) -> Thất bại (Fail) -> Điều chỉnh (Adjust) -> Và Hoàn thành (Send).**

Hẹn gặp lại anh em trên tường leo!