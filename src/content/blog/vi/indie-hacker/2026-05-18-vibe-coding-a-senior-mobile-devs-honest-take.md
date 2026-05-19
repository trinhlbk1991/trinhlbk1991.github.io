---
title: "Vibe Coding: 3 Tháng Trải Nghiệm — Góc Nhìn Thật Lòng Của Senior Mobile Dev"
date: 2026-05-18T08:00:00
categories: ["indie-hacker"]
tags: ["Vibe Coding", "AI", "Cursor", "Claude Code", "Developer Productivity", "Indie Hacker"]
summary: "Mình đã vibe code suốt 3 tháng qua. Đây là những gì thực sự hoạt động, những gì thất bại, và liệu senior dev có nên quan tâm không."
toc: true
comments: true
image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop"
---

Nếu anh em chưa nghe đến thuật ngữ "vibe coding", thì chắc chắn sẽ sớm nghe thôi. Collins Dictionary đã chọn nó làm **Từ của Năm 2025**. Tech Twitter đang nổ tung vì nó. Và đâu đó trong Slack hay Discord của anh em, chắc chắn có người đang nói rằng "cái này sẽ thay thế toàn bộ developer" hoặc "cái này toàn rác" — chẳng có quan điểm nào ở giữa cả.

Mình đã thử nghiệm vibe coding suốt 3 tháng qua — xây dựng tính năng mới cho [Buckist](https://buckist.app), prototype các side project, tích hợp nó vào workflow làm mobile development hằng ngày. Và sau tất cả những đó, mình mới cảm thấy sẵn sàng chia sẻ góc nhìn thật lòng. Không hype, không doom. Chỉ là những gì mình thực sự quan sát được.

<img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop" alt="Giao diện AI coding assistant — người bạn đồng hành pair programming mới."/>

## Vibe Coding Là Gì Vậy?

Thuật ngữ này do Andrej Karpathy (cựu giám đốc AI của Tesla, một trong những "ông tổ" của deep learning) đặt ra vào đầu năm 2025. Mô tả ban đầu của ông gần như là thơ: thay vì viết code từng dòng một, anh em **mô tả những gì mình muốn ở cấp độ cao** và để AI tự xây dựng. Anh em ở trong cái "vibe" của sản phẩm — trải nghiệm người dùng, luồng hoạt động, cảm giác — trong khi AI lo phần gõ phím.

Trong thực tế, điều này có nghĩa là dùng các công cụ như:
- **Cursor** — một IDE xây dựng trên VSCode, tích hợp AI sâu và hiểu toàn bộ codebase của anh em
- **Claude Code** — agent chạy trong terminal, có thể duyệt file, chạy lệnh, và tự thực thi các tác vụ nhiều bước
- **GitHub Copilot** ở chế độ agent — khả năng tương tự, tích hợp ngay trong VSCode

Lời hứa là thế này: thay vì làm "thợ đánh máy" chuyển đổi logic thành cú pháp, anh em trở thành **đạo diễn**. Mô tả mục tiêu, xem kết quả, lặp lại.

Nghe có vẻ quá tốt để là thật? Hãy cùng tìm hiểu.

## Tuần Đầu: Chế Độ Nghi Ngờ Toàn Phần

Thật lòng mà nói — phản ứng ban đầu của mình là phủ nhận. Mình đã code Android hơn 10 năm. Mình biết Kotlin còn rõ hơn biết một số người trong gia đình. Ý tưởng rằng AI có thể hiểu codebase của mình — với tất cả context, các quyết định kiến trúc, quirk từ legacy code, và những quy tắc bất thành văn — nghe có vẻ gần như vô lý.

Vì vậy mình đã test theo kiểu của senior dev: cho nó thử thứ khó nhất trước.

Mình trỏ Claude Code vào một trong những module phức tạp nhất của Buckist — engine lên lịch thói quen (habit scheduling) — và yêu cầu nó thêm một pattern lặp lại mới.

Và... nó làm đúng khoảng 70% ngay lần đầu. Không hoàn hảo, nhưng cũng không phải rác. Nó hiểu được kiến trúc. Nó theo đúng các pattern hiện có. Chỗ nó thất bại là một business rule tinh tế chỉ tồn tại trong đầu mình — một edge case xử lý timezone không rõ ràng từ code.

Sự thất bại đó dạy mình bài học quan trọng nhất của cả 3 tháng.

## Vibe Coding Thực Sự Giúp Ích Ở Đâu

Sau 3 tháng, đây là những nơi mình thực sự dùng AI tools:

### Boilerplate Tốn Não

Room entity mới với migration? Retrofit interface mới với xử lý lỗi đầy đủ? Fragment mới với MVVM wiring chuẩn? Những thứ này tốn 5–15 phút gõ máy móc, cần tập trung nhưng không tạo ra giá trị sáng tạo gì. Claude Code xử lý trong vài giây — và thường theo đúng các pattern trong codebase hiện tại của anh em còn tốt hơn một junior hire mới vào.

### Test. Vô Vàn Test.

Mình ghét viết unit test cho các utility function đơn giản. Mình biết chúng quan trọng. Mình biết TDD rất hay về lý thuyết. Nhưng viết `@Test fun given_X_when_Y_then_Z()` lần thứ 400 thật sự rất tra tấn tinh thần. AI viết những cái này nhanh và thường đúng. Chỉ điều này thôi đã giúp test coverage của mình tăng lên đáng kể.

### Debug Với Một Bộ Não Thứ Hai

Paste stack trace, mô tả context, hỏi "chuyện gì đang xảy ra ở đây?" Cái này cực kỳ hữu ích — không phải vì AI luôn biết câu trả lời, mà vì giải thích một bug rõ ràng cho *bất kỳ ai* (kể cả AI) thường khai sáng chính sự hiểu biết của mình. Feynman Technique dùng như một công cụ debug.

### Prototype Nhanh Cho Indie Projects

Với side project mới khi mình chỉ cần validate một idea nhanh, vibe coding thực sự biến đổi mọi thứ. Những gì trước đây mất cả cuối tuần để scaffold giờ chỉ mất một buổi chiều. Tháng trước mình build và ship một prototype hoàn chỉnh trong chưa đầy 4 tiếng. Không phải nói quá đâu.

<img src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=1200&auto=format&fit=crop" alt="Code dark-mode trên màn hình — môi trường sống tự nhiên của một vibe coder."/>

## Nơi Nó Thất Bại (Và Phần Này Quan Trọng Hơn)

Đây là chỗ con tàu hype lướt qua không để ý.

### Bất Cứ Thứ Gì Ở Cấp Kiến Trúc

Yêu cầu AI thêm một tính năng → tốt. Yêu cầu AI thiết kế lại data layer → anh em sẽ nhận được một mớ hỗn độn. Quyết định kiến trúc đòi hỏi hiểu biết toàn diện về trade-off, constraints của team, gánh nặng bảo trì dài hạn, và historical context mà AI đơn giản là không có. Nó sẽ cho anh em *một* câu trả lời, nghe có vẻ tự tin, nhưng đó là pattern-matching từ dữ liệu training — không phải lập luận từ tình huống cụ thể của anh em.

### Code Liên Quan Đến Bảo Mật

Một cuộc kiểm tra năm 2025 phát hiện rằng **45% code do AI tạo ra chứa lỗ hổng bảo mật** — command injection, hardcoded secrets, các API call không an toàn. AI không có ác ý; nó chỉ tối ưu hóa cho "code chạy được" thay vì "code an toàn." Luôn review thủ công bất cứ thứ gì liên quan đến xác thực, thanh toán, hoặc dữ liệu người dùng. Luôn luôn.

### Vấn Đề Với Business Logic Tinh Tế

Như edge case timezone của mình trong Buckist: những quy tắc tồn tại trong đầu, trong các Slack thread từ hai năm trước, trong một comment code review mà không ai đọc nữa — AI không biết những thứ đó. Nó sẽ implement theo cách hiểu rõ ràng nhất. Mà cách hiểu rõ ràng nhất thường là sai.

## Setup Hiện Tại Của Mình

Sau 3 tháng thử nghiệm, đây là những gì mình thực sự dùng hằng ngày:

- **Claude Code** cho các tác vụ tự động nặng — refactor một module, tạo nhiều file cùng lúc, điều tra bug xuyên suốt toàn codebase. Nó chạy trong terminal và hoạt động độc lập. Mình giao việc và chuyển sang làm thứ khác trong lúc nó chạy.
- **Cursor** cho interactive coding — là VSCode có siêu năng lực. Mình viết code với nó luôn mở, dùng inline suggestions liên tục. Nhanh hơn GitHub Copilot và codebase indexing rất xuất sắc.
- **Không dùng cái nào, chỉ suy nghĩ** cho các quyết định kiến trúc và bất cứ thứ gì liên quan đến bảo mật.

Combo hoạt động tốt nhất: bắt đầu một feature bằng Claude Code (tự động scaffold), tinh chỉnh interactive trong Cursor, sau đó review thủ công trước khi commit. Mỗi tool chơi đúng vai của nó.

## Sự Chuyển Dịch Kỹ Năng Thực Sự

Đây là điều không ai nói cho anh em về vibe coding: **bottleneck chuyển từ viết sang review**.

Trước đây: phần khó là viết code đúng.  
Bây giờ: phần khó là review code do AI tạo ra đủ kỹ để bắt được những gì sai.

Cái này thực sự khó hơn nghe thì tưởng. Code review đòi hỏi hiểu biết sâu — anh em cần thấy những gì *thiếu*, không chỉ những gì có ở đó. Junior developer khó làm điều này tốt với AI output. **Senior developer đã dành nhiều năm làm code review là người có vị thế độc đáo để tận dụng vibe coding một cách an toàn.** Kinh nghiệm không trở nên kém giá trị hơn — nó trở thành thứ làm cho AI trở nên có giá trị.

Developer có nguy cơ bị thay thế nhất không phải senior dev có thể đánh giá nghiêm túc AI output. Đó là những người đang làm các tác vụ coding máy móc, ít đòi hỏi phán đoán ngay từ đầu. Và ngay cả timeline đó cũng dài hơn những gì các "doomer" gợi ý.

## Kết Luận

Sau 3 tháng: **vibe coding là có thật, hữu ích, và mang lại lợi ích nhiều hơn cho developer có kinh nghiệm so với người mới.**

Nếu anh em có 10+ năm kinh nghiệm phần mềm, AI tools là upgrade năng suất đòn bẩy cao nhất anh em có thể thêm vào workflow ngay lúc này. Khoảng cách kinh nghiệm có nghĩa là anh em có thể đánh giá output tốt, bắt lỗi nhanh, và hướng dẫn AI với độ chính xác cao.

Nếu anh em là junior developer, hãy dùng nó — nhưng dùng để học, không phải để bỏ qua việc học. Hiểu tất cả những gì nó tạo ra. Developer ship code AI một cách mù quáng đang xây dựng technical debt và skill debt cùng một lúc.

Với các indie project của mình, nó thực sự biến đổi mọi thứ. Với production mobile code ở công việc chính, nó hữu ích nhưng cẩn thận. Tỷ lệ đó có thể thay đổi khi các tool tốt hơn và bản năng prompting của mình sắc bén hơn.

Giờ nếu anh em cho phép, mình còn 3 prototype nữa cần ship trước cuối tuần. 🛠️

Anh em có kinh nghiệm gì với vibe coding không? Comment bên dưới nhé — mình tò mò liệu các mobile dev khác có thấy cùng pattern không.

Happy coding!
