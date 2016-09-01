---
layout: post
title: Add Webpart Connection Programmatically
date: 2014-01-22 10:51
author: trinh_le
comments: true
categories: [blog]
tags: [SharePoint]
---
Yesterday, I was assigned a quite tough task which cost me a lot of effort to finish <img id="smilie_251" title="Nosebleed" src="http://vozforums.com/images/smilies/Off/nosebleed.gif" alt="add webpart connection programmatically" />

The requirement is:
<ul>
	<li>You have a Provider List</li>
</ul>
<p style="text-align: center;"><img src="https://lh6.googleusercontent.com/-vcPEkfcPqZM/UoyBQ4zfUpI/AAAAAAAAFVs/LAXms1y7NcI/w353-h146-no/1.png" alt="add webpart connection programmatically" /></p>

<ul>
	<li>You have a Consumer List with Connection column look up to Title column in Provider List<img class="aligncenter" src="https://lh5.googleusercontent.com/-R633mufCyJQ/UoyBQzMnoiI/AAAAAAAAFV4/dJVcIpwvfmg/w333-h637-no/2.png" alt="add webpart connection programmatically" /></li>
	<li><img class="alignnone" src="https://lh3.googleusercontent.com/-IzuNabjj0V4/UoyBQ3gRuSI/AAAAAAAAFVw/wnO0Mf2Mync/w598-h186-no/3.png" alt="add webpart connection programmatically" /></li>
	<li>Add a LisView webpart of Consumer List to Display form of Provider list with filter like image below:</li>
</ul>
<img class="aligncenter" src="https://lh5.googleusercontent.com/-PuqaEur-j8c/UoyBRfi6wWI/AAAAAAAAFWE/Ik5Bvi2I8e0/w622-h446-no/4.png" alt="add webpart connection programmatically" />

To resolve this problem using SharePoint UI is quite easy with just few clicks! <img id="smilie_245" title="Look Down" src="http://vozforums.com/images/smilies/Off/look_down.gif" alt=":look_down:" />

But the REAL problem is I have to add webpart connection programmatically!<img id="smilie_229" title="Oh" src="http://vozforums.com/images/smilies/Off/oh.gif" alt=":oh:" />

Damn hard! <img id="smilie_197" title="Cry" src="http://vozforums.com/images/smilies/Off/cry.gif" alt=":((" />

Finally, I found the solution... <img id="smilie_248" title="Embarrassed" src="http://vozforums.com/images/smilies/Off/embarrassed.gif" alt=":&quot;&gt;" />

<!--more-->
<h2>How to add webpart connection programmatically?</h2>
Let's take a look at <strong>Run</strong> method:
<pre class="lang:default decode:true ">public void Run(string siteURL)
        {   
            using (SPSite spSite = new SPSite(siteURL))
            {
                using (SPWeb spWeb = spSite.OpenWeb())
                {
                    try
                    {
                        //This is consumer list (a list which contains a lookup field containing values from provider list)
                        SPList spListConsumer = spWeb.Lists["Consumer List"];

                        //THis is provider list
                        SPList spListProvider = spWeb.Lists["Provider List"];

                        //This is the Display Form web part page                    
                        SPFile dispFormCARView = spWeb.GetFile(spListProvider.DefaultDisplayFormUrl);

                        DisplayRelatedOnForm(spWeb, dispFormCARView, spListConsumer, "Connection");

                        dispFormCARView.Update();

                        Console.WriteLine("...Done!");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("===Exception: " + ex.Message);
                    }
                }
            }
        }</pre>
&nbsp;

There's 3 things we need to do in this method:
<ul>
	<li>Get SPList object of consumer list</li>
	<li>Get SPList object of provider list</li>
	<li>Get SPFile object of the page we want to add ListView webpart into</li>
</ul>
<strong>DisplayRelatedOnForm</strong> method detail:
<pre class="lang:default decode:true ">public void DisplayRelatedOnForm(SPWeb web, SPFile dispForm, SPList spListConsumer, string consumerCol)
        {
            // Get the web part manager which we will use to interact
            SPLimitedWebPartManager wpm = dispForm.GetLimitedWebPartManager(System.Web.UI.WebControls.WebParts.PersonalizationScope.Shared);

            // Only execute this code if there is a single web part (the default for this list)
            // We don't want to add the web parts over and over again ..
            if (wpm.WebParts.Count == 1)
            {
                //Create List View web part
                XsltListViewWebPart wp = new XsltListViewWebPart();

                //Hook up the list and the default view 
                wp.ListId = spListConsumer.ID;
                wp.ListName = spListConsumer.ID.ToString();
                wp.ViewGuid = spListConsumer.DefaultView.ID.ToString();
                wp.XmlDefinition = spListConsumer.DefaultView.GetViewXml();

                //Set basic properties along with the title
                wp.AllowConnect = true;
                wp.Title = spListConsumer.Title;
                wp.ChromeType = PartChromeType.TitleAndBorder;

                //Add the web part to the Main zone in position 2
                wpm.AddWebPart(wp, "Main", 2);
                WebPartPage webpartpage = new WebPartPage();
            }
            System.Web.UI.WebControls.WebParts.WebPart consumer = wpm.WebParts[1];
            System.Web.UI.WebControls.WebParts.WebPart provider = wpm.WebParts[0];

            ProviderConnectionPoint providerPoint = wpm.GetProviderConnectionPoints(provider)["ListFormRowProvider_WPQ_"];
            ConsumerConnectionPoint consumerPoint = wpm.GetConsumerConnectionPoints(consumer)["DFWP Filter Consumer ID"];

            // Create our "Transformer"
            // We also specify which Field names we want to "connect" together
            // Here I am connecting my Related List's "Connection" and filtering it
            // Using the "ID" of my List Form's item.
            SPRowToParametersTransformer transformer= new SPRowToParametersTransformer();
            transformer.ProviderFieldNames = new string[] { "ID" };
            transformer.ConsumerFieldNames = new string[] { consumerCol };

            // Connect the two web parts together, using our Connection Point objects
            // along with our Transformer
            wpm.SPConnectWebParts(provider, providerPoint, consumer, consumerPoint, transformer);
        }</pre>
&nbsp;

As you can see, I put very clear comments for this method so that you can understand them easily.<img id="smilie_208" title="Adore" src="http://vozforums.com/images/smilies/Off/adore.gif" alt=":adore:" />

I just want to conclude what <strong>DisplayRelatedOnForm</strong> method do shortly:
<ul>
	<li>Get the WebpartManager of the page you want to add webpart into</li>
	<li>Create ListView webpart and set its important properties value (like ListID, ListName, ViewID,...)</li>
	<li>Add the webpart to desired webpart zone</li>
	<li>Create <strong>ProviderConnectionPoint</strong> and <strong>ConsumerConnectionPoint </strong>objects - this is required step to create connection</li>
	<li>Create <strong>SPRowToParametersTransformer </strong>object - which define which Fields name we want connect together</li>
	<li>Finally, connect them by using <strong>SPConnectWebParts</strong> method.</li>
</ul>
And here is the way we use two <em>those </em>methods:
<pre class="lang:default decode:true ">static void Main(string[] args)
        {
            Program program = new Program();

            //Read input site url
            Console.WriteLine("Input site URL: ");
            string siteURL = Console.ReadLine();

            program.Run(siteURL);

        }</pre>
&nbsp;

Done! <img id="smilie_224" title="Beauty" src="http://vozforums.com/images/smilies/Off/beauty.gif" alt=":beauty:" />

Source Code: <a href="https://drive.google.com/file/d/0BzvV1wN-WHWwNm55TUU1NGRnR1k/edit?usp=sharing">https://drive.google.com/file/d/0BzvV1wN-WHWwNm55TUU1NGRnR1k/edit?usp=sharing</a>
