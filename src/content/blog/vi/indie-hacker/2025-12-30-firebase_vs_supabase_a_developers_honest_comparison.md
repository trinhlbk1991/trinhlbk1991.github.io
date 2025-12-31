---
title: "Firebase vs. Supabase: Review Thiệt Tình Từ Một Mobile Dev"
date: 2025-12-30
categories: ["indie-hacker"]
tags: ["Indie Hacker", "Firebase", "Supabase", "Backend"]
summary: "Góc nhìn thật lòng của một mobile developer về cuộc chiến Backend: Nên chọn 'Ma thuật' của Google hay 'Sức mạnh' của SQL?"
toc: true
comments: true
image: "/assets/images/indie-hacker/firebase_supabase.jpeg"
---

Nếu anh em là mobile developer như mình (Android, iOS, hay Flutter 🙋‍♂️), chắc hẳn ai cũng thuộc lòng cái kịch bản này:
1. Nảy số được một ý tưởng app triệu đô (hoặc ít nhất là mình nghĩ vậy).
2. Mở IDE lên, code khí thế.
3. Và rồi đâm sầm vào bức tường mang tên: **The Backend.**

Giải pháp "mì ăn liền" phổ biến nhất suốt bao năm qua luôn là: **"Cứ dùng Firebase đi."** Nó giống như chiếc hộp ma thuật của Google vậy. Cứ ném cục JSON vào, bùm, dữ liệu được sync qua điện thoại của user trong một nốt nhạc.

Nhưng dạo gần đây, một thanh niên mới đã xuất hiện: **Supabase**. Tự xưng là "Mã nguồn mở thay thế cho Firebase", được xây dựng trên nền tảng **PostgreSQL** thần thánh.

Vậy cho dự án tiếp theo (có thể là bản update lớn cho [Buckist](https://buckist.app) chẳng hạn?), mình sẽ chọn phe nào? Hãy cùng mổ xẻ cuộc chiến **Firebase vs. Supabase**, dựa trên những trải nghiệm "đau thương" của bản thân mình.

<img src="/assets/images/indie-hacker/firebase_supabase.jpeg"  alt="Kèo này ai thắng? Firebase hay Supabase?"/>

## 1. Database: Firestore (NoSQL) vs. PostgreSQL (SQL)
Đây là sự khác biệt lớn nhất, và nó thay đổi hoàn toàn tư duy code của anh em.

**Firebase (Firestore)** là NoSQL document store. Hãy tưởng tượng nó giống như một cái folder khổng lồ chứa một đống file JSON lộn xộn.
*   **Ngon:** Setup nhanh chóng. Không cần đau đầu thiết kế schema trước. Cứ code tới đâu phang data tới đó.
*   **Dở:** Query cực kỳ tù túng. Muốn lọc data kiểu *"Tìm user đã mua giày VÀ sống ở Việt Nam VÀ đăng ký tuần trước"*? Goodluck! Hỗ trợ query của Firestore khá hạn chế, đôi khi bắt buộc mình phải duplicate data mới query được.

**Supabase** thực chất là **PostgreSQL** với giao diện thân thiện.
*   **Ngon:** Chuẩn SQL. Anh em tha hồ dùng `JOINS`, khóa ngoại (foreign keys), và các query phức tạp. Nếu app có dữ liệu quan hệ (ví dụ như app *myMoney* của mình: Danh mục -> Giao dịch -> Ngân sách), SQL sẽ giúp cho dữ liệu luôn "ngay hàng thẳng lối".
*   **Dở:** Phải thiết kế Database Schema (CSDL) ngay từ đầu. Mà thú thật, dù dùng cái nào thì kỹ năng thiết kế DB cũng là skill sinh tồn, anh em nên master nó nếu không muốn phải loay hoay viết migration scripts!

**Chốt:** Nếu cần dữ liệu có quan hệ chặt chẽ (Relational Data), Supabase thắng. Nếu cần lưu logs hoặc dữ liệu phi cấu trúc, Firebase vẫn ngon. Cá nhân mình đã gặp quá nhiều kiếp nạn khi query trên Firestore, nên 1 vé cho Supabase.

## 2. Pricing: "Nỗi Lo Hoá Đơn Lúc 3 Giờ Sáng"
Đây là lý do chính khiến mình quyết định "quay xe" sang Supabase.

**Firebase** tính tiền dựa trên **Reads và Writes** (Lượt đọc/ghi).
Nếu anh em lỡ tay viết một vòng lặp "ngáo" khiến app đọc database 10.000 lần mỗi giây, anh em sẽ tỉnh dậy với một cái hoá đơn dài như sớ táo quân. Mô hình chi phí kiểu này bắt bạn phải cực kỳ kỹ lưỡng trong việc tối ưu code truy vấn tới Firebase, nếu không, mọi bài học đều phải trả giá bằng tiền!

*Trải nghiệm đau thương:* Để tiết kiệm tiền, mình đã phải cache database xuống client và giới hạn số lần user được request lên server. Điều này ảnh hưởng nghiêm trọng tới trải nghiệm người dùng, làm họ cảm thấy app chạy không mượt mà :(

**Supabase** tính tiền dựa trên **Dung lượng lưu trữ (Storage Size)**.
Họ không quan tâm anh em đọc bao nhiêu lần. Nếu database của anh em chỉ nặng 500MB, thì giá tiền vẫn thế dù có 10 user hay 10.000 user. Dễ thở hơn nhiều!

<img src="/assets/images/indie-hacker/firebase_bill.jpeg"  alt="Cố gắng tối ưu code chỉ để không bị Google trừ tiền oan."/>

**Chốt:** Mình ghét việc phải hy sinh trải nghiệm user chỉ để tiết kiệm tiền server. Một vé nữa cho Supabase.

## 3. Đồng bộ dữ liệu real time
Nếu anh em làm app Chat, app theo dõi tỉ số bóng đá, hay game multiplayer, **Firebase** vẫn là lựa chọn tối ưu.
*   **Firebase:** Realtime luôn là điểm ăn tiền. Data thay đổi phát là client nhận được ngay, gần như zero-config.
*   **Supabase:** Sử dụng replication log của PostgreSQL để bắn update qua WebSockets. Nó hoạt động ổn, nhưng anh em phải tự tay "subscribe" vào từng table. Cảm giác hơi thủ công so với độ tiện lợi của Firebase.

**Chốt kèo:** Kẻ tám lạng người nửa cân. Tuỳ nhu cầu mà chọn thôi (Chat thì Firebase, còn lại Supabase vẫn cân tốt).

## 4. Vendor Lock-In: Mã nguồn mở vs. Google
*   **Firebase:** Hàng độc quyền. Anh em bị trói chặt vào hệ sinh thái Google Cloud. Nếu Google buồn buồn "khai tử" một tính năng nào đó (mà Google thì [nổi tiếng vụ đem con bỏ chợ này rồi](https://killedbygoogle.com)), thì anh em chỉ có nước khóc tiếng Mán.
*   **Supabase:** Là **Open Source**. Anh em có thể tự host Supabase trên server riêng (DigitalOcean, AWS, hay thậm chí con Raspberry Pi ở nhà) bằng Docker. Dữ liệu là của mình, mình thích làm gì thì làm.

## Tổng Kết: Chọn Phe Nào Năm 2025?

Sau khi lăn lộn với cả hai ông lớn này, đây là quy tắc nằm lòng của mình:

**Vẫn dùng Firebase nếu:**
*   Cần làm MVP hoặc prototype nhanh gọn lẹ cuối tuần này.
*   Cần tính năng Offline mode xịn nhất cho mobile app.
*   Phụ thuộc nhiều vào Google Analytics và Crashlytics.

**Chuyển sang Supabase ngay nếu:**
*   App có dữ liệu quan hệ phức tạp (Khách hàng, Đơn hàng, Kho bãi...).
*   Sợ đau tim vì hoá đơn server tăng đột biến.
*   Muốn dùng sức mạnh của **SQL** để query thoải mái mà không cần hack code nát bét.

## Mình Đang Dùng Gì?
Với mấy tool nhỏ nhỏ, side project mình vẫn dùng Firebase. Nhưng với các app quản lý tài chính phức tạp hơn như **myMoney**, mình đang dần chuyển sang Supabase. Cảm giác yên tâm khi có một SQL database chuẩn chỉnh - và một hoá đơn tiền server dễ đoán - thực sự đáng để thay đổi.

Còn anh em? Team Google hay Team Open Source?