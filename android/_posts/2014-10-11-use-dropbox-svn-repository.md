---
layout: post
title: Use Dropbox as SVN Repository
date: 2014-10-11 23:21
author: trinh_le
comments: true

tags: [SVN, Dropbox]
---
Version controlling is one of the most important concept in Software Development. It allow you to track all the version of files, folders among different team members in a very easy way.

By the way, nowaday cloud becomes very popular with us. I'm pretty sure that everyone has at least one cloud storage.

In this post, I'll show you how to use your cloud storage as a SVN repository. FYI, I'll use Dropbox in this post. If you haven't register, you can sign up here: <a title="https://db.tt/nRWfkXgc" href="https://db.tt/nRWfkXgc" target="_blank">https://db.tt/nRWfkXgc</a>

<!--more-->
<h2>1. Set up environment</h2>
Firstly, you need to download TortoiseSVN.

Then, register a <a href="https://db.tt/nRWfkXgc" target="_blank">Dropbox</a> account and install Dropbox on your computer.
<h2>2. Create repository</h2>
Open Dropbox folder and create new folder. Right click select <strong>TortoiseSVN</strong> --&gt; <strong>Create repository here...</strong>

<img class="aligncenter" src="https://farm3.staticflickr.com/2950/15318964379_0955efaf01_o.png" alt="" />

It will create a repository for you and show the result dialog with the highlight link to created repository:

<img class="aligncenter" src="https://farm4.staticflickr.com/3956/15505495822_5eb2119dd0_o.png" alt="" />

Now, you have a repository ready for use :)
<h2>3. Share repository</h2>
To provide permission for your teammate to access the repository, you need to login to dropbox website, navigate to repository folder and select Share function.

Type your teamates' email, select their permission and Share folder.

As you can see here, I use the Basic account so that I cannot provide "view permission" for my teammates. You need to upgrade your account to enable this.

<img class="aligncenter" src="https://farm4.staticflickr.com/3929/15319141210_4ae4335788_b.jpg" alt="" />
<h2>4. Enjoy!</h2>
Everything's done. Now you can start your project, use TortoiseSVN as normal to manage all your source code and document.

Check out

<img class="aligncenter" src="https://farm4.staticflickr.com/3927/15505877115_c5959132e1_o.png" alt="" />

Commit

<img class="aligncenter" src="https://farm3.staticflickr.com/2947/15482720056_de3f0faf5d_o.png" alt="" />

Update

<img class="aligncenter" src="https://farm4.staticflickr.com/3934/15505877205_4177e1b3ec_b.jpg" alt="" />

Hope you enjoy this post :)
