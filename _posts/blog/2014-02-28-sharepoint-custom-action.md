---
layout: post
title:  Custom Action
date: 2014-02-28 14:55
author: trinh_le
comments: true
categories: [blog]
tags: [SharePoint]
---

<h2>A. What is Custom Action?</h2>
Custom Action allow you to extends the default user interface of SharePoint (ex. add a new button into the default ribbon bar)

There're 2 ways to add a Custom Action:
<ul>
	<li>Use SharePoint feature</li>
	<li>Use SharePoint Designer</li>
</ul>
In this post, I'll show you how to add a Custom Action using SharePoint feature. Cause I rarely use SharePoint Designer <img alt=":angry:" src="http://vozforums.com/images/smilies/Off/angry.gif" />

<!--more-->
<h2>B. Custom Action Elements</h2>
Before creating a Custom Action, you have to know about its schema:
<ul>
	<li><strong>Description</strong>: The Custom Action's description</li>
	<li><strong>Title</strong>: The Custom Action's title</li>
	<li><strong>ID</strong>: The Custom Action's unique id</li>
	<li><strong>Location</strong>: The Custom Action's location. For example, with <strong>CommandUI.Ribbon.DisplayForm</strong> the Custom Action will be shown on DisplayForm.</li>
	<li><strong>RegistrationId</strong>: Specifies the identifier of the list or item content type that this action is associated with. For example, a value of 100 indicates that you are attaching this custom action to a Custom List type.</li>
	<li><strong>Sequence</strong>: Specifies the ordering priority for actions. A value is 0 indicates that the button will appear at the first position on the ribbon.</li>
	<li><strong>Rights</strong>: Specifies a set of rights that the user must have for the link to be visible. For example, <strong>ViewListItems</strong> indicates that a person with <strong>View List Items</strong> permission can access this custom action. If not specified, then the action always appears in the list of actions.</li>
</ul>
Example:
<pre>&lt;CustomAction  
Description=<span style="color: maroon;">"Search Title on Bing"</span>  
Title=<span style="color: maroon;">"Bing It!"</span>  
Id=<span style="color: maroon;">"{E538E8C7-65DA-454E-AD87-4A603B6CC569}"</span>  
Location=<span style="color: maroon;">"CommandUI.Ribbon.DisplayForm"</span>  
RegistrationId=<span style="color: maroon;">"100"</span>  
RegistrationType=<span style="color: maroon;">"List"</span>  
Sequence=<span style="color: maroon;">"0"</span>  
Rights=<span style="color: maroon;">"ViewListItems"</span>  
xmlns=<span style="color: maroon;">"http://schemas.microsoft.com/sharepoint/"</span>&gt;</pre>
&nbsp;
<h2><strong>C. CommandUIExtension element</strong></h2>
<strong>CommandUIExtension</strong> element was used to extends the interface of a Custom Action
<h2><strong>D. CommandUIDefinition element</strong></h2>
<strong>CommandUIDefinition</strong> element is used to define all elements of a Custom Action, ex. button, dropdown list...
<ul>
<ul>
<ul>
	<li><strong>Location</strong>: Specifies the location of this command, ex. <strong>Ribbon.ListForm.Display.Manage.Controls._children.</strong></li>
</ul>
</ul>
</ul>
<h2><strong>E. Control Element</strong></h2>
Access this link to have a closer look to each control/ commnad detail: <a href="http://msdn.microsoft.com/en-us/library/ff458373(v=office.14).aspx">http://msdn.microsoft.com/en-us/library/ff458373(v=office.14).aspx</a>

For example:
<pre>&lt;CommandUIDefinition Location=<span style="color: maroon;">"Ribbon.ListForm.Display.Manage.Controls._children"</span>&gt;  
&lt;Button Id=<span style="color: maroon;">"{B511A716-54FF-4EAE-9CBE-EA02B51B626E}"</span>  
Command=<span style="color: maroon;">"{4E2F5DC0-FE2C-4466-BB2D-3ED0D1917763}"</span>  
Image32by32=<span style="color: maroon;">"~site/_layouts/Images/BingSearch/bing32.png"</span>  
Image16by16=<span style="color: maroon;">"~site/_layouts/Images/BingSearch/bing16.png"</span>  
Sequence=<span style="color: maroon;">"0"</span>  
LabelText=<span style="color: maroon;">"Bing It!"</span>  
Description=<span style="color: maroon;">"Search Title on Bing"</span>  
TemplateAlias=<span style="color: maroon;">"o1"</span> /&gt;  
&lt;/CommandUIDefinition&gt;</pre>
<h2><strong>F. CommandUIHandler element</strong></h2>
<strong>CommandUIHandler</strong>
<ul>
<ul>
	<li><strong>Command</strong>: </li>
</ul>
</ul>
<ul>
	<li><strong>CommandAction</strong>: </li>
</ul>

<pre>&lt;CommandUIHandler Command=<span style="color: maroon;">"{4E2F5DC0-FE2C-4466-BB2D-3ED0D1917763}"</span> CommandAction=<span style="color: maroon;">"javascript:window.open('http://www.bing.com/search?q='.concat(escape(document.title)))"</span> /&gt;</pre>
<!-- code formatted by http://manoli.net/csharpformat/ -->
<div class="csharpcode">
<h2><span class="lnum">G. Example
</span></h2>
Create an <strong>Emply Element</strong> and name it as CustomAction

<img class="aligncenter size-full wp-image-1116" alt="Custom Action" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/13.jpg" width="800" height="564" />

In the Element.xml file, add new some content like below - in order to create a Custom Action group in Site Setting page:
<pre>&lt;?xml version=<span style="color: maroon;">"1.0"</span> encoding=<span style="color: maroon;">"utf-8"</span>?&gt; 
&lt;Elements xmlns=<span style="color: maroon;">"http://schemas.microsoft.com/sharepoint/"</span>&gt; 
  &lt;CustomActionGroup Description=<span style="color: maroon;">"Demo Custom Action Group"</span> 
                    Id=<span style="color: maroon;">"ExtraSiteSettings"</span> 
                    ImageUrl=<span style="color: maroon;">"/_layouts/images/SiteSettings_SiteAdmin_48x48.png"</span> 
                    Location=<span style="color: maroon;">"Microsoft.SharePoint.SiteSettings"</span> 
                    Sequence=<span style="color: maroon;">"113"</span> 
                    Title=<span style="color: maroon;">"More Settings"</span>&gt; 
  &lt;/CustomActionGroup&gt; 
  &lt;CustomAction GroupId=<span style="color: maroon;">"ExtraSiteSettings"</span> Id=<span style="color: maroon;">"ExtraSiteSettings.SiteSettings"</span> 
                Location=<span style="color: maroon;">"Microsoft.SharePoint.SiteSettings"</span> 
                Sequence=<span style="color: maroon;">"107"</span> 
                Title=<span style="color: maroon;">"View List Movie"</span> 
                Rights=<span style="color: maroon;">"ManageWeb"</span>&gt; 
    &lt;UrlAction Url=<span style="color: maroon;">"~sitecollection/Lists/Movies/Default%20View.aspx"</span> /&gt; 
  &lt;/CustomAction&gt; 

  &lt;CustomAction GroupId=<span style="color: maroon;">"ExtraSiteSettings"</span> Id=<span style="color: maroon;">"ExtraSiteSettings.SiteSettings"</span> 
              Location=<span style="color: maroon;">"Microsoft.SharePoint.SiteSettings"</span> 
              Sequence=<span style="color: maroon;">"108"</span> 
              Title=<span style="color: maroon;">"View Home Page"</span> 
              Rights=<span style="color: maroon;">"ManageWeb"</span>&gt; 
    &lt;UrlAction Url=<span style="color: maroon;">"~site/Pages/default.aspx"</span> /&gt; 
  &lt;/CustomAction&gt; 

&lt;/Elements&gt;</pre>
Open project's feature, and select activating Custom Action with feature:

<img class="aligncenter size-full wp-image-1117" alt="2" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/23.jpg" width="209" height="332" /> <img class="aligncenter size-full wp-image-1118" alt="3" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/33.jpg" width="800" height="449" />

Deploy and enjoy the result:

<img class="aligncenter size-full wp-image-1119" alt="4" src="http://trinhle.icetea09.com/wp-content/uploads/2013/08/43.jpg" width="648" height="660" />

&nbsp;

</div>
