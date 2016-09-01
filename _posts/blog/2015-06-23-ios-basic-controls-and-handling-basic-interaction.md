---
layout: post
title: iOS Tutorials - Basic Controls and Handling Basic Interaction
date: 2015-06-23 15:14
author: admin
comments: true
categories: [blog]
tags: [iOS, Swift]
image: https://c2.staticflickr.com/2/1562/24424510389_eb300e566e_h.jpg
---
In this post, I'll go step by step to create a demo showing you how to use basic controls (Label, Text Field, Image View, Slider,...) to build and iOS application and handle basic user interaction.

Below with be the final result for this post demo - How to use basic controls and handling basic interaction:
<br/>
<img src="https://farm1.staticflickr.com/314/18872042919_8b630dafe3_b.jpg" alt="" width="200px" /> <img src="https://farm1.staticflickr.com/553/18437539353_1e0a644676_b.jpg" alt="" width="200px" />
<iframe width="560" height="315" src="https://www.youtube.com/embed/JQPBiVA4IVg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

<h2>A - Build the application layout</h2>
Firstly, we have to layout all needed controls on the screen.

To use any controls, you have to drag and drop it into the view.

After that, to make the layout more adaptive to different screen sizes, you must define constrains for every controls on the screen. Please prefer to the <a href="http://icetea09.com/blog/2015/06/12/ios-introduction-to-xcode-and-swift/" target="_blank">previous post</a> to know more details.

Please find some suggestion constrains for this demo layout below:
<ul>
	<li><a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIImageView.html" target="_blank"><strong>Image View</strong></a>: center horizontally in container<a href="https://farm1.staticflickr.com/285/18871559770_355abea327_b.jpg" target="_blank"><img class="alignnone" src="https://farm1.staticflickr.com/285/18871559770_355abea327_b.jpg" alt="" width="1024" height="238" /></a></li>
	<li><a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UISegmentedControl.html#//apple_ref/doc/uid/TP40012857-UISegmentedControl-SW1" target="_blank"><strong>Segment</strong></a>: below ImageView and center horizontally in container<a href="https://farm1.staticflickr.com/414/19059272485_d0f62c4efe_b.jpg" target="_blank"><img class="alignnone" src="https://farm1.staticflickr.com/414/19059272485_d0f62c4efe_b.jpg" alt="" width="824" height="341" /></a></li>
	<li>2 <strong>View Containers</strong> (one for Login and the other for Survey): below Segment and center horizontally</li>
</ul>
<a href="https://farm1.staticflickr.com/503/18437540113_9bff04da6d_b.jpg" target="_blank"><img class="alignnone" src="https://farm1.staticflickr.com/503/18437540113_9bff04da6d_b.jpg" alt="" width="1024" height="712" /></a>

When you place the View Container inside View Controller, it will automatically generates a sub View Controller which allows you to layout all desired controls inside:

<a href="https://farm1.staticflickr.com/359/18870513140_ae8c1244e9_b.jpg" target="_blank"><img class="alignnone" src="https://farm1.staticflickr.com/359/18870513140_ae8c1244e9_b.jpg" alt="" width="1024" height="663" /></a>

<span style="color: #b50000;"><em><strong>If you want to know all the details rule for this demo layout, please <a href="https://github.com/trinhlbk1991/DemoBasiciOSControls" target="_blank">download </a>the source code and go through. I won't explain all the constrains details in this post.</strong></em></span>
<h2>B - Handle Basic Interaction</h2>
After finish layouting app's GUI, now we will handle basic interactions.
<h3>1. Outlets</h3>
<a href="https://developer.apple.com/library/mac/documentation/General/Conceptual/Devpedia-CocoaApp/Outlet.html#//apple_ref/doc/uid/TP40009071-CH4" target="_blank"><strong>Outlet</strong> </a>allows you refer to a View/Control in storyboard from controller class. Simpler, <strong>Outlet</strong> is a kind of pointer that points to a control in the interface.

To <a href="https://developer.apple.com/library/mac/recipes/xcode_help-IB_connections/chapters/AboutConnectingObjectstoCode.html#//apple_ref/doc/uid/TP40014227-CH42-SW1" target="_blank">create an <strong>Outlet</strong></a>, firstly you must select the control. Then hold <strong>Ctrl</strong> key and click, drag selected control to the controller class.

After you released, a dialog will pop up. Select <strong>Outlet</strong> in the <strong>Connection</strong> drop down list, type the desired name for outlet variable, then press <strong>Connect</strong>.

<img class=" aligncenter" src="https://farm4.staticflickr.com/3875/18870542498_990c2c41c4_o.png" alt="" />

The result is below line of code will be added into the controller class:
<pre class="lang:swift decode:true">@IBOutlet weak var tfName: UITextField!</pre>
<ul>
	<li> <strong>weak</strong>: describe that this Outlet connection is not a strong connection which can be deallocated automatically as soon as there's no references to it.</li>
</ul>
<h3>2. Action</h3>
<strong>Action</strong> is a special method which can be triggered by a control in storyboard (Action is similar to Event in Java).

Like <strong>Outlet</strong>, <a href="https://developer.apple.com/library/mac/recipes/xcode_help-IB_connections/chapters/CreatingAction.html#//apple_ref/doc/uid/TP40014227-CH16-SW1" target="_blank"><strong>Action</strong> can be created</a> by holding <strong>Ctrl</strong> key and dragging the control to controller class.

When the dialog popped up, select <strong>Action</strong> instead of <strong>Outlet</strong>. You also need to specify the <strong>Action Type </strong>(ValueChanged, TouchUpInside,...) and function parameter for this <strong>Action</strong> here.

<img class=" aligncenter" src="https://farm1.staticflickr.com/334/19061414301_30f5f3c3dc_o.png" alt="" />

Some lines of code like this will be added to controller class:
<pre class="lang:swift decode:true ">@IBAction func onBtnLoginClicked(sender: UIButton) {
	
}</pre>
<h3>3. Outlet Collection</h3>
<strong>Outlet Collections</strong> allow you to connect multiple objects of the same kind to a single array property, rather than creating a separate property for each object.
<pre class="lang:swift decode:true">@IBOutlet weak var arrayTextFields: [UITextField]!</pre>
<h3> 4. Apply to Demo app</h3>
Firstly, we want to display appropriate <strong>View Container</strong> based on <strong>Segment</strong> current value (When user selects Login/Survey segment, app must show Login/Survey View Container).

To do that, we must create:
<ul>
	<li>2 outlets for 2 <strong>View Container</strong></li>
	<li>Action <strong><span class="st">ValueChanged</span></strong> <span class="pl-en">onSegmentValueChanged</span> for the <strong>Segment</strong></li>
</ul>
<a href="https://farm1.staticflickr.com/503/18437540113_9bff04da6d_b.jpg" target="_blank"><img class="aligncenter" src="https://farm1.staticflickr.com/503/18437540113_9bff04da6d_b.jpg" alt="" width="1024" height="712" /></a>

Inside function <strong><span class="pl-en">onSegmentValueChanged</span></strong>, we implemented below code to show/hide View Containers properly:
<pre class="lang:default decode:true">@IBAction func onSegmentValueChanged(sender: UISegmentedControl) {
	let selectedSegment = sender.selectedSegmentIndex
	switch selectedSegment{
		case 0:
			containerLogin.hidden = false
			containerSurvey.hidden = true
			break;
		case 1:
			containerLogin.hidden = true
			containerSurvey.hidden = false
			break;
		default:
			//Do nothing
			break;
	}
}</pre>
Next, move the Login form.

You must apply the <strong>Custom Class</strong> for <strong>Login View Controller</strong> and <strong>Survey View Controller</strong> is the <strong>View Controller</strong> class. This allows you to refer to these two <strong>View Controller</strong>'s controls from <strong>View Controller</strong> class.

<a href="https://farm4.staticflickr.com/3753/19061414171_8aeb210d98_b.jpg" target="_blank"><img class="aligncenter" src="https://farm4.staticflickr.com/3753/19061414171_8aeb210d98_b.jpg" alt="" width="907" height="580" /></a>

Then, create:
<ul>
	<li>2 <strong>Outlets</strong> for 2 <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UITextField.html#//apple_ref/doc/uid/TP40012857-UITextField-SW1" target="_blank"><strong>TextField</strong> </a>(name and phone)</li>
	<li><strong>Action</strong> <strong>TouchUpInside</strong> for <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIButton.html" target="_blank"><strong>Button</strong> </a>Login (<span class="pl-en">onBtnLoginClicked</span>)</li>
</ul>
<a href="https://farm1.staticflickr.com/538/19058219175_562512249b_b.jpg" target="_blank"><img class="aligncenter" src="https://farm1.staticflickr.com/538/19058219175_562512249b_b.jpg" alt="" width="1024" height="495" /></a>

Implement button Login behavior. When user hit the Login button, a <a href="https://developer.apple.com/library/prerelease/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIActionSheet.html#//apple_ref/doc/uid/TP40012857-UIActionSheet" target="_blank"><strong>ActionSheet</strong> </a>will show for user to confirm if he/she really wants to login. If use hit yes, show an <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIAlertView.html#//apple_ref/doc/uid/TP40012857-UIAlertView-SW1" target="_blank">Alert </a>dialog with "Login successfully" message.
<pre class="lang:swift decode:true"> @IBAction func onBtnLoginClicked(sender: UIButton) {
    let controllerLoginDialog = UIAlertController(title: "Login", message: "Do you want to log in?", preferredStyle: UIAlertControllerStyle.ActionSheet)
    
    let actionYes = UIAlertAction(title: "Yes", style: UIAlertActionStyle.Default, handler: { action in
        
        let controllerLoginSuccessDialog = UIAlertController(title: "Login", message: "Logged in successfully!", preferredStyle: UIAlertControllerStyle.Alert)
    
        let actionOk = UIAlertAction(title: "OK", style: UIAlertActionStyle.Default, handler: nil)
    
        controllerLoginSuccessDialog.addAction(actionOk)    
        self.presentViewController(controllerLoginSuccessDialog, animated: true, completion: nil)
    })

    let actionNo = UIAlertAction(title: "Cancel", style: UIAlertActionStyle.Destructive, handler: nil)
    
    controllerLoginDialog.addAction(actionYes)
    controllerLoginDialog.addAction(actionNo)
    
    presentViewController(controllerLoginDialog, animated: true, completion: nil)
}</pre>
Now, move to Survey form. The expected behavior of this form is that when user turn off the switch, the slider is disable and vice versa.

Create:
<ul>
	<li>2 Outlets for <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UISlider.html#//apple_ref/doc/uid/TP40012857-UISlider-SW1" target="_blank">Slider </a>and <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UILabel.html#//apple_ref/doc/uid/TP40012857-UILabel-SW1" target="_blank">Label</a></li>
	<li>2 Actions type ValueChanged for the Slider and <a href="https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UISwitch.html#//apple_ref/doc/uid/TP40012857-UISwitch-SW1" target="_blank">Switch</a></li>
</ul>
<a href="https://farm4.staticflickr.com/3813/18870514410_b76f532fc9_b.jpg" target="_blank"><img class=" aligncenter" src="https://farm4.staticflickr.com/3813/18870514410_b76f532fc9_b.jpg" alt="" width="1024" height="509" /></a>Implement Switch and Slider behavior:
<pre class="">@IBAction func onSliderValueChanged(sender: UISlider) {
    let sliderValue = sender.value
    lbSliderValue.text = "\(sliderValue)"
}

@IBAction func onSwitchSurveyValueChanged(sender: UISwitch) {
    sliderSurvey.enabled = sender.on
}</pre>
One last thing to improve user experience, we want to hide the virtual keyboard whenever user press Done/Return.

To do that, we need to create an Action type <strong>DidEndOnExit</strong> and put the below line of code:
<pre class="">@IBAction func onTextFieldDoneEdit(sender: UITextField) {
    sender.resignFirstResponder()
}</pre>
<a href="https://farm1.staticflickr.com/472/18437539173_132a23b70b_b.jpg" target="_blank"><img class=" aligncenter" src="https://farm1.staticflickr.com/472/18437539173_132a23b70b_b.jpg" alt="" width="1024" height="245" /></a>Now you can run and enjoy the demo ;)
<h2>C - Summary</h2>
After this post, I hope that you will know:
<ul>
	<li>How to use basic controls (Label, Text Field, Slider, Segment, Switch,...) in your iOS app</li>
	<li>What Outlet and Action are</li>
	<li>How to create Outlet, Action and use them to implement your app behavior</li>
</ul>
I also embedded some useful link to Apple Developer website, so that you can learn and understand more.
<h2>D - Download Source Code</h2>
<a href="https://github.com/trinhlbk1991/DemoBasiciOSControls" target="_blank">https://github.com/trinhlbk1991/DemoBasiciOSControls</a>
