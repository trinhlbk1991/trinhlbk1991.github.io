---
layout: post
title:  Single Client Validation for Multiple Dynamic Custom Validator
date: 2014-01-24 15:40
author: admin
comments: true
categories: [blog]
tags: [JavaScript]
---

<h2>A - Preface</h2>
I tried so hard to shorten the title of this entry but It seems impossible, so ... whatever! Finally, the title is super long -  "Single Client Validation for Multiple Dynamic Custom Validator"<img id="smilie_251" title="Nosebleed" src="http://vozforums.com/images/smilies/Off/nosebleed.gif" alt=":nosebleed:" />

<!--more-->
<h2>B - Problem</h2>
On your web form has tons of DropDownList, but all of them have the same validation rule - must be chose!

And to handle all of them, we have to write tons of validation method in Javascript is a crazy thing! <img id="smilie_216" title="Beat Shot" src="http://vozforums.com/images/smilies/Off/beat_shot.gif" alt=":shot:" />
<h2>C - Solution</h2>
In the common Javascript validation method, we can get the current value of the control via its ID, then we can check the validation rule easily:
<pre>&lt;script type=<span style="color: maroon;">"text/javascript"</span>&gt;
    <span style="color: blue;">function</span> CommonValidationForDropDownList(sender, args) {
        <span style="color: #ff0000;"><em><strong><span style="text-decoration: underline;"><span style="text-decoration: underline;">var</span> v = document.getElementById(document.getElementById(sender.id).controltovalidate).value;</span></strong></em></span>
        <span style="color: blue;">if</span> (v == <span style="color: maroon;">'Please select one'</span>) {
            args.IsValid = <span style="color: maroon;">false</span>;
        }
        <span style="color: blue;">else</span> {
            args.IsValid = <span style="color: maroon;">true</span>;
        }
    }    
&lt;/script&gt;</pre>
<!--more-->

In the CustomValidator control of ASP.Net, we call the validation method above:
<pre><span style="color: blue;">&lt;</span><span style="color: maroon;">asp:DropDownList</span> <span style="color: red;">ID</span>="<span style="color: blue;">ddlSalutation</span>" <span style="color: red;">runat</span>="<span style="color: blue;">server</span>"<span style="color: blue;">&gt;</span>
<span style="color: blue;">&lt;</span>/<span style="color: maroon;">asp:DropDownList</span><span style="color: blue;">&gt;</span><span style="color: blue;">&lt;</span><span style="color: maroon;">br</span> /<span style="color: blue;">&gt;</span>

<span style="color: blue;">&lt;</span><span style="color: maroon;">asp:CustomValidator</span> <span style="color: red;">ID</span>="<span style="color: blue;">CustomValidator1</span>" <span style="color: red;">runat</span>="<span style="color: blue;">server</span>" <span style="color: red;">ControlToValidate</span>="<span style="color: blue;">ddlSalutation</span>" <span style="color: red;">ClientValidationFunction</span>="<span style="color: blue;">CommonValidationForDropDownList</span>" <span style="color: red;">Display</span>="<span style="color: blue;">Dynamic</span>" <span style="color: red;">ErrorMessage</span>="<span style="color: blue;">Please select a salutation</span>"<span style="color: blue;">&gt;</span>
<span style="color: blue;">&lt;</span>/<span style="color: maroon;">asp:CustomValidator</span><span style="color: blue;">&gt;</span></pre>
And ... done!

We had a validation method to reuse several times!
