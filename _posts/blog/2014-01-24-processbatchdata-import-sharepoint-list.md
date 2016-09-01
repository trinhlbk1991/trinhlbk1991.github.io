---
layout: post
title: Using ProcessBatchData To Import Data To SharePoint List
date: 2014-01-24 14:52
author: admin
comments: true
categories: [blog]
tags: [C Sharp, SharePoint]
---

<h2>1 - When to use ProcessBatchData ?</h2>
When you need to insert a large amount of items into SharePoint list, It'll decrease the performance if you use SPListItem.Update() method. To resolve this problem, we will use the SPWeb.ProcessBatchData() method. This way will allow the database to handle all request at all and the performance will increase much.

<!--more-->
<h2>2 - Introduce to input XML file structure</h2>
The SPWeb.ProcessBatchData() method has an argument is an XML string with the structure like below:
<pre class="lang:default decode:true ">const string BULK_DATA_TEMPLATE = "&lt;Method ID="{0}"&gt;" +
                                        "&lt;SetList&gt;{1}&lt;/SetList&gt;" +
                                        "&lt;SetVar Name="ID"&gt;New&lt;/SetVar&gt;" +
                                        "&lt;SetVar Name="Cmd"&gt;Save&lt;/SetVar&gt;" +
                                        "&lt;SetVar Name="{2}{3}"&gt;{4}&lt;/SetVar&gt;" +
                                        "&lt;/Method&gt;";</pre>
&nbsp;
<ul>
	<li>{0}: The method's ID, feel free with this value.</li>
	<li>{1}: The SPList ID which you want to update</li>
	<li>{2}: The prefix in front of every column's name, which is a constant value: "urn:schemas-microsoft-com:office:office#"</li>
	<li>{3}: The static name of the column you want to update</li>
	<li>{4}: The update value</li>
</ul>
<h2>3 - Demo</h2>
Firstly, create a SharePoint list - "Demo Bulk Data" - with the Custom List type and the default column is Title.

<img class="aligncenter" src="https://lh4.googleusercontent.com/--EGIIPs3MV0/UmdxPY6HdKI/AAAAAAAAFR0/1WuNoB616Ho/w664-h412-no/1.png" alt="" />

Create a webpart named DemoInsertBulkData with the GUI like this:

<img class="aligncenter" src="https://lh6.googleusercontent.com/-Onmw3tKngzY/UmdxPaEFyCI/AAAAAAAAFRo/I2cgrXK-8ik/w537-h110-no/3.png" alt="" />

Declare all the constants that describe the structure of input XML file:
<pre class="lang:default decode:true ">const string BULK_DATA_TEMPLATE = "&lt;Method ID="{0}"&gt;" +
                                        "&lt;SetList&gt;{1}&lt;/SetList&gt;" +
                                        "&lt;SetVar Name="ID"&gt;New&lt;/SetVar&gt;" +
                                        "&lt;SetVar Name="Cmd"&gt;Save&lt;/SetVar&gt;" +
                                        "&lt;SetVar Name="{2}{3}"&gt;{4}&lt;/SetVar&gt;" +
                                        "&lt;/Method&gt;";
        const string BULK_DATA_COLUMN_PREFIX = "urn:schemas-microsoft-com:office:office#";
        const string BULK_DATA_TEMPLATE_OPEN_TAG = "&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;Batch&gt;";
        const string BULK_DATA_TEMPLATE_CLOSE_TAG = "&lt;/Batch&gt;";
        const string BULK_DATA_TEMPATE_METHOD_ID = "InsertBulkData";</pre>
&nbsp;

Code to handle the Test button:
<pre class="lang:default decode:true ">protected void btnTest_Click(object sender, EventArgs e)
        {
            using (SPSite spSite = new SPSite(SPContext.Current.Site.Url))
            {
                using (SPWeb spWeb = spSite.OpenWeb("/Test"))
                {
                    SPList spList = spWeb.Lists.TryGetList("Demo Bulk Data");
                    if (spList != null)
                    {
                        StringBuilder strBuilder = new StringBuilder();
                        strBuilder.Append(BULK_DATA_TEMPLATE_OPEN_TAG);
                        for (int i = 0; i &lt; 500; i++)
                        {
                            strBuilder.AppendFormat(BULK_DATA_TEMPLATE, BULK_DATA_TEMPATE_METHOD_ID, spList.ID.ToString(),
                                                BULK_DATA_COLUMN_PREFIX, "Title", i.ToString());
                        }
                        strBuilder.Append(BULK_DATA_TEMPLATE_CLOSE_TAG);

                        spWeb.AllowUnsafeUpdates = true;
                        spWeb.ProcessBatchData(strBuilder.ToString());
                        spWeb.Update();
                        spWeb.AllowUnsafeUpdates = false;
                    }
                }
            }
        }</pre>
&nbsp;

The code above will import 500 new records into SharePoint list, they will be set the value from 1 to 500.

After finish building the input XML string, call the <em><strong>spWeb.ProcessBatchData(strBuilder.ToString();</strong></em> to run

And the result is:

<img class="aligncenter" src="https://lh6.googleusercontent.com/-kaLwX8-I8Eo/UmdxPaZx33I/AAAAAAAAFRw/7Jl3aBLlgVI/w569-h469-no/2.png" alt="" />

P/S: The result is a little bit obvious but who care LOL <img id="smilie_208" title="Adore" src="http://vozforums.com/images/smilies/Off/adore.gif" alt=":adore:" />
