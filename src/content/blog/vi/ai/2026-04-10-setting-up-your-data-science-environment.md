---
title: "Thiết Lập Môi Trường Data Science (Góc Nhìn Của Dân Android)"
date: 2026-04-10
categories: ["ai"]
tags: ["AI", "Machine Learning", "Python", "Jupyter", "Setup"]
summary: "Tạm biệt Android Studio, xin chào Jupyter. Hướng dẫn setup môi trường Data Science — và tại sao workflow này khiến dân mobile dev 'ngơ ngác' lúc đầu."
toc: true
comments: true
image: "/assets/images/ai/android-to-ai.png"
---

Ngày thứ 2 trong hành trình [Android-sang-AI](/vi/ai/2026-04-09-why-im-leaving-android-for-ai/) của mình, và hôm nay chúng ta làm cái việc mà dev nào cũng phải làm khi bắt đầu project mới: **setup môi trường**.

Nhưng lần này không có Android Studio. Không có Gradle. Không có cái `build.gradle.kts` sync 3 phút mới xong. Thay vào đó, chúng ta bước vào thế giới của **notebooks, virtual environments, và code kiểu REPL** — cảm giác xa lạ cực kỳ nếu anh em quen với compiled languages.

Mình sẽ hướng dẫn từng bước — và thú thật luôn về cú "sốc văn hoá".

## Thay Đổi Tư Duy: IDE vs. Notebook

Workflow Android quen thuộc:
1. Viết code trong Android Studio
2. Build project (đợi... đợi... đợi...)
3. Chạy trên emulator hoặc thiết bị thật
4. Xem kết quả
5. Lặp lại

Workflow Data Science:
1. Viết vài dòng code trong một **cell**
2. Nhấn Shift+Enter
3. Kết quả hiện ra **ngay lập tức** bên dưới code
4. Viết cell tiếp dựa trên kết quả vừa thấy
5. Lặp lại

Đây gọi là **notebook paradigm**, và nó giống kiểu "trò chuyện" với data hơn là phát triển phần mềm truyền thống. Anh em khám phá, thử nghiệm, visualize, rồi lặp lại — tất cả trong cùng một file. Hãy tưởng tượng `println()` debugging được nâng cấp thành nghệ thuật.

Lúc đầu mình thấy kỳ kỳ. Ủa project structure đâu? Packages đâu? Sao mọi thứ nằm trong một file? Nhưng sau vài giờ, mình bắt đầu hiểu: **notebook là để khám phá, không phải để production**. Nó là bản phác thảo trước khi vẽ tranh thật.

## Bước 1: Cài Python với Miniconda

Nếu anh em đã có Python... cài lại bằng **Miniconda** đi. Lý do:

Dân Android biết quá rõ nỗi đau dependency conflict giữa các project. Project này cần library version này, project kia cần version khác. Trong Python, vấn đề này gấp 10 lần vì Python không có `build.gradle` tự động resolve dependency.

**Miniconda** giải quyết bằng cách tạo môi trường biệt lập (giống như AVD riêng cho từng project, nhưng cho Python versions và libraries).

```bash
# Download Miniconda (Linux/macOS)
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Hoặc trên macOS dùng Homebrew
brew install --cask miniconda
```

Sau khi cài xong, tạo environment đầu tiên:

```bash
# Tạo environment cho hành trình AI
conda create -n ai-journey python=3.11

# Kích hoạt
conda activate ai-journey

# Cài bộ công cụ Data Science
pip install numpy pandas matplotlib seaborn jupyter plotly streamlit scikit-learn
```

**Tại sao Miniconda chứ không phải Anaconda?** Anaconda ship kèm ~250 packages (~3GB). Miniconda chỉ có package manager (~80MB) — cài gì dùng nấy. Dân Android mà, quen tối ưu APK size rồi, chắc chẳng cần suy nghĩ nhiều 😄

## Bước 2: Jupyter Lab — "IDE" Mới Của Anh Em

**JupyterLab** là Android Studio phiên bản Data Science. À, kiểu vậy. Nó là IDE chạy trên trình duyệt, hỗ trợ notebooks, terminal, và file browser.

```bash
# Cài và khởi chạy
pip install jupyterlab
jupyter lab
```

Trình duyệt sẽ mở tab `localhost:8888`. Đó chính là workspace của anh em.

### Giao Diện Notebook

Một Jupyter notebook (file `.ipynb`) gồm các **cell**. Hai loại quan trọng:

- **Code cell**: Viết Python, nhấn Shift+Enter, output hiện ra bên dưới
- **Markdown cell**: Viết text có format, giải thích, ghi chú

Cái khiến mình "á" là: output có thể là **bất cứ thứ gì**. Text, bảng, biểu đồ, hình ảnh, interactive widgets. Gọi `df.head()` trên DataFrame là ra bảng HTML đẹp đẽ, không phải mớ text lộn xộn. Gọi `plt.show()` thì biểu đồ hiện ra *ngay trong notebook*.

### Phím Tắt (Android Studio → Jupyter)

| Thao tác | Android Studio | Jupyter Lab |
|---|---|---|
| Chạy | Shift+F10 | Shift+Enter |
| Chạy tất cả | — | Ctrl+Shift+Enter |
| Thêm cell bên dưới | — | B (command mode) |
| Thêm cell bên trên | — | A (command mode) |
| Xoá cell | — | DD (command mode) |
| Toggle comment | Ctrl+/ | Ctrl+/ |
| Command palette | Ctrl+Shift+A | Ctrl+Shift+C |
| Tìm kiếm | Ctrl+F | Ctrl+F |

**Mẹo hay**: Nhấn `Esc` để vào command mode (viền cell chuyển xanh dương), rồi dùng phím tắt đơn. Nhấn `Enter` để quay lại edit mode (viền cell chuyển xanh lá). Giống Vim modal editing — lạ lúc đầu nhưng quen rồi thì không thể thiếu.

## Bước 3: Google Colab — Lựa Chọn Miễn Phí

Nếu không muốn cài gì cả, **Google Colab** chính là Jupyter trên cloud — miễn phí. Và có **GPU miễn phí**, cái mà anh em sẽ cần sau này khi học Deep Learning.

Vào [colab.research.google.com](https://colab.research.google.com), đăng nhập Google, là code được liền.

### Khi Nào Dùng Cái Nào?

| | Jupyter Lab (Local) | Google Colab |
|---|---|---|
| **Setup** | Phải cài | Không cần |
| **Tốc độ** | Tuỳ máy anh em | GPU/TPU miễn phí |
| **Internet** | Chạy offline được | Bắt buộc có mạng |
| **Lưu trữ** | File local | Google Drive |
| **Tuỳ chỉnh** | Full control, extensions | Hạn chế |
| **Chia sẻ** | Qua Git | Như Google Docs |
| **Phù hợp** | Học hàng ngày, data lớn | Thử nhanh, cần GPU |

**Khuyến nghị của mình**: Dùng **Jupyter Lab local** cho việc học hàng ngày (nhanh hơn, chạy offline). Dùng **Colab** khi cần sức mạnh GPU hoặc muốn chia sẻ notebook nhanh.

## Bước 4: Extensions Hữu Ích

Jupyter Lab hỗ trợ extensions, giống plugin trong Android Studio:

```bash
# Auto-format code (như Ctrl+Alt+L trong Android Studio)
pip install jupyterlab-code-formatter black isort

# Variable inspector (như debugger variable view)
# Có sẵn trong JupyterLab 4.x — chuột phải notebook chọn "New Console for Notebook"

# Table of contents (như Structure view)
# Có sẵn trong JupyterLab 4.x — click icon TOC ở sidebar trái
```

## Cú "Sốc Văn Hoá" Thật Lòng

Mình nói thật về những gì khiến dân Android dev khó chịu ban đầu:

**Không có type safety.** Python là dynamically typed. Sau bao năm được Kotlin bao bọc bởi null safety và type inference, viết code mà biến `x` có thể là integer, string, hay DataFrame tuỳ thuộc vào cell nào chạy trước... cảm giác *nguy hiểm* lắm. Anh em SẼ gặp type error. Thường xuyên.

**Không có project structure.** Trong Android, mọi thứ có chỗ riêng: `app/src/main/java/com/...`. Trong notebook, tất cả nằm trong một file dài. Kỷ luật tổ chức code phải đến từ bản thân, không phải IDE.

**Thứ tự chạy cell rất quan trọng.** Cells có thể chạy theo bất kỳ thứ tự nào. Nếu chạy cell 5 trước cell 3, kết quả có thể khác. Giống như `onCreate()` chạy sau `onDestroy()` vậy. Hỗn loạn. Luôn dùng "Restart Kernel and Run All" để verify notebook chạy đúng từ trên xuống dưới.

**Không có compile step = không có lưới an toàn.** Trong Android, compiler bắt lỗi trước khi app chạy. Trong Python, mọi lỗi phát hiện lúc runtime. Mỗi. Lần.

**Nhưng bù lại:** Feedback loop *tức thì*. Không có 30 giây build. Không phải đợi emulator khởi động. Viết một dòng, chạy, thấy kết quả. Cho việc khám phá data, tốc độ này gây nghiện thật sự.

## Notebook Đầu Tiên: Kiểm Tra Mọi Thứ Hoạt Động

Để chắc chắn setup thành công, mình tạo một notebook test đơn giản. Anh em nên làm tương tự:

```python
# Cell 1: Import libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("All imports successful!")
print(f"NumPy version: {np.__version__}")
print(f"pandas version: {pd.__version__}")
```

```python
# Cell 2: Tạo data giả
data = {
    'day': range(1, 31),
    'hours_studied': np.random.uniform(2, 5, 30),
    'confidence': np.cumsum(np.random.uniform(0.5, 2, 30))
}
df = pd.DataFrame(data)
df.head()
```

```python
# Cell 3: Biểu đồ đầu tiên
plt.figure(figsize=(10, 5))
plt.plot(df['day'], df['confidence'], marker='o', color='#19a485')
plt.title('Hành Trình Học AI — Confidence Theo Thời Gian (Simulated)')
plt.xlabel('Ngày')
plt.ylabel('Điểm Confidence Tích Luỹ')
plt.grid(True, alpha=0.3)
plt.show()
```

Nếu thấy biểu đồ đường đi lên — chúc mừng, môi trường sẵn sàng rồi! Nếu thấy error messages — chào mừng đến với Python debugging. Giống LogCat thôi, nhưng stack trace bằng tiếng Anh 😂

***

Setup xong rồi. Công cụ đã sẵn sàng. Ngày mai chúng ta lao vào thứ "thật" đầu tiên: **NumPy fundamentals** — nơi anh em sẽ phát hiện ra tại sao array không phải list và tại sao vectorized operations nhanh hơn Python loops 100 lần.

Từ `ArrayList` của Java và `List<T>` của Kotlin sang NumPy array... chuyến đi này sẽ thú vị lắm đây.

Hẹn gặp ở cell tiếp theo! 💻
