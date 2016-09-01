---
layout: post
title:  Add Webpart Into Application Page
date: 2014-02-26 17:50
author: trinh_le
comments: true
categories: [blog]
tags: [SharePoint]
---

<h2>A - Custom Webpart</h2>
To add Webpart into Application Page, first of all, we need to register that webpart with the syntax below:
<pre>&lt;%@ Register TagPrefix=<span style="color: maroon;">"WP"</span> Namespace=<span style="color: maroon;">"Namespace of your webpart"</span> Assembly=<span style="color: maroon;">"Assembly of your webpart"</span>%&gt;</pre>
Then, you can add that webpart to anywhere in the Application Page like an common User Control:
<pre>&lt;WpNs0:TabSFPage runat=<span style="color: maroon;">"server"</span> ID=<span style="color: maroon;">"g_291c88a4_0df9_4acf_9cd2_7c84d2fba90d"</span> Description=<span style="color: maroon;">"My Visual WebPart"</span> Title=<span style="color: maroon;">"TabSFPage"</span> __MarkupType=<span style="color: maroon;">"vsattributemarkup"</span> __WebPartId=<span style="color: maroon;">"{291C88A4-0DF9-4ACF-9CD2-7C84D2FBA90D}"</span> WebPart=<span style="color: maroon;">"true"</span> __designer:IsClosed=<span style="color: maroon;">"false"</span> partorder=<span style="color: maroon;">"2"</span>&gt;&lt;/WpNs0:TabSFPage&gt;</pre>
<!--more-->
<h2>B - ListView Webpart</h2>
In SharePoint, the easiest way to add a ListView webpart (or others OOB webpart) into an Application Page is using your own hands :))

<img src="https://lh3.googleusercontent.com/-W8PK_JUqcSQ/UlJP6UcN2KI/AAAAAAAAFQ4/Kcmad6HMWAE/w958-h416-no/1.png" alt="" />

Then, open SharePoint Designer to copy that code and paste into the desired Application Page:

<img class="aligncenter" src="https://lh4.googleusercontent.com/-TuQBGud5-KE/UlJP6XOK5gI/AAAAAAAAFRA/7jG3gfC1Bvg/w267-h464-no/2.png" alt="" />

&nbsp;

Below is the XML code of SF Generic Goal Verification ListView webpart:

<img src="https://lh5.googleusercontent.com/-f8g6SIDDEwQ/UlJP6YI-jmI/AAAAAAAAFQ8/swOAjIUc-ug/w845-h777-no/3.png" alt="" />

P/s: You can use this way for Custom Webpart too :)

Have fun!
