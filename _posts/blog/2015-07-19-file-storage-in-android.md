---
layout: post
title: File Storage in Android
date: 2015-07-19 16:22
author: admin
comments: true
categories: [blog]
tags: [Android, Java]
image: /images/posts/19709750348_4de20141d2_b.jpg
---

In a very old post (<a href="http://icetea09.com/blog/2014/03/04/android-save-data-to-file/" target="_blank">Save Data To File</a>), I wrote about writing data to and reading data from internal file storage. And that is a very very simple post about working with File Storage in Android.
<br/>
In this post, I'll show you a deeper look into the Android file storage and how to perform file-related tasks.

<h2>A - Internal Storage vs External Storage</h2>
All Android devices has 2 file storage areas:
<ul>
	<li>Internal Storage: a built-in, non-violated memory for individual app</li>
	<li>External Storage: a removable storage such as SD card. But nowadays, many devices divide its permanent memory into 2 part internal and external, in this case, external storage is not a "<em>removable storage</em>".</li>
</ul>
Comparison:
<table>
<tbody>
<tr>
<td style="background-color: #8bc34a;">Internal Storage</td>
<td style="background-color: #8bc34a;">External Storage</td>
</tr>
<tr>
<td>Always available</td>
<td> Only available if the removable storage was mounted into the device</td>
</tr>
<tr>
<td>By default, the internal storage is only accessible by its own application</td>
<td> Word-readable</td>
</tr>
<tr>
<td>If user uninstall the application, every data in internal storage will be deleted</td>
<td>If user uninstall the application, all the data which was not stored in <strong>getExternalFileDir()</strong> folder will remain</td>
</tr>
</tbody>
</table>
<!--more-->
<h2>B - Work with Internal Storage</h2>
<h3>1. Write File</h3>
Firstly, you have to call <strong>Context.openFileOutput()</strong> method to open a file in internal storage and return a <strong>FileOutputStream</strong> (create new file if it doesn't exist):
<pre class="lang:default decode:true ">FileOutputStream fos = context.openFileOutput(fileName, Context.MODE_PRIVATE);</pre>
This method takes 2 parameters:
<ul>
	<li>name: the file's name</li>
	<li>mode: writing mode
<ul>
	<li><strong>MODE_PRIVATE</strong> : file can be accessed only  by the application which created it</li>
	<li><strong>MODE_WORLD_READALBE</strong> : That file can be read by any application</li>
	<li><strong>MODE_WORLD_WRITABLE</strong> : That file can be read and written by any application</li>
</ul>
</li>
</ul>
Then, you can write the data in bytes format to created file and remember to close the stream after wrote:
<pre class="lang:default decode:true ">public static void writeToInternalStorage(Context context, String fileName, byte[] data)
        throws IOException {
    FileOutputStream fos = context.openFileOutput(fileName, Context.MODE_PRIVATE);
    fos.write(data);
    fos.close();
}</pre>
<h3>2. Read File</h3>
In order to read data from a file, you must create a <strong>FileInputStream</strong> object by calling <strong>openFileInput()</strong> method:
<pre class="lang:default decode:true ">FileInputStream fis = context.openFileInput(fileName);</pre>
This method takes file name as the only parameter.

Then, you can read data in bytes format from the input stream and remember to close it after read:
<pre class="lang:default decode:true">public static byte[] readFromInternalStorage(Context context, String fileName)
        throws IOException {
    FileInputStream fis = context.openFileInput(fileName);
    byte[] result = getBytesArrayFromInputStream(fis);
    fis.close();
    return result;
}

/***
* Return a bytes array from the InputStream
*/
private static byte[] getBytesArrayFromInputStream(InputStream input) throws IOException {
    byte[] buffer = new byte[8192];
    int bytesRead;
    ByteArrayOutputStream output = new ByteArrayOutputStream();
    while ((bytesRead = input.read(buffer)) != -1) {
        output.write(buffer, 0, bytesRead);
    }
    return output.toByteArray();
}</pre>
<h2>C - Work with External Storage</h2>
<h3>1. Check External Storage Availability</h3>
Because the external storage is not always available, to make sure the application works properly, we have to check if the external storage is available or not:
<pre class="lang:default decode:true">public static boolean isExternalStorageWritable() {
    String state = Environment.getExternalStorageState();
    if (Environment.MEDIA_MOUNTED.equals(state)) {
        return true;
    }
    return false;
}

public static boolean isExternalStorageReadable() {
    String state = Environment.getExternalStorageState();
    if (Environment.MEDIA_MOUNTED.equals(state) ||
            Environment.MEDIA_MOUNTED_READ_ONLY.equals(state)) {
        return true;
    }
    return false;
}</pre>
<h3>2. Write File</h3>
In external storage, we have 2 types of directory:
<ul>
	<li>Public: when the application was uninstalled, all the data in this directory will remain. You can refer to this directory using <strong>Environment.getExternalStoragePublicDirectory()</strong> method.</li>
	<li>Private: when the application was uninstalled, all the data in this directory will be deleted. You can refer to this directory using <strong>Context.getExternalFileDir()</strong> method.</li>
</ul>
You usually use public directory to store the data that can be used by other application (captured photos, downloaded files,...) and private directory for the data that is only meaningful to your app.

To write data to external storage:
<ul>
	<li>Open or create selected file</li>
	<li>Create Output Stream for that file</li>
	<li>Write data</li>
	<li>Close the stream after wrote</li>
</ul>
<pre class="lang:default decode:true"> public static void writeToExternalPublicFile(String dirType, String fileName, byte[] data)
        throws IOException {
    File file = new File(Environment.getExternalStoragePublicDirectory(dirType), fileName);
    file.createNewFile();
    FileOutputStream fos = new FileOutputStream(file);
    fos.write(data);
    fos.close();
}

public static void writeToExternalPrivateFile(Context context, String dirType, String fileName, byte[] data)
        throws IOException {
    File file = new File(context.getExternalFilesDir(dirType), fileName);
    file.createNewFile();
    FileOutputStream fos = new FileOutputStream(file);
    fos.write(data);
    fos.close();
}</pre>
<h3>3. Read File</h3>
To read data to external storage:
<ul>
	<li>Open the selected file</li>
	<li>Create Input Stream for that file</li>
	<li>Read data from the Input Stream</li>
	<li>Close the stream after read</li>
</ul>
<pre class="lang:default decode:true">public static byte[] readFromExternalPublicFile(String dirType, String fileName)
        throws IOException {
    File file = new File(Environment.getExternalStoragePublicDirectory(dirType), fileName);
    FileInputStream fis = new FileInputStream(file);
    byte[] result = getBytesArrayFromInputStream(fis);
    fis.close();
    return result;
}

public static byte[] readFromExternalPrivateFile(Context context, String dirType, String fileName)
        throws IOException {
    File file = new File(context.getExternalFilesDir(dirType), fileName);
    FileInputStream fis = new FileInputStream(file);
    byte[] result = getBytesArrayFromInputStream(fis);
    fis.close();
    return result;
}</pre>
<h2>D - Demo Application and Source Code</h2>
To apply the above codes, we will make a small demo application to show you how to work with File Storage in Android.

The application has 4 button to invoke different functions about read and write data in internal and external storage and a text view to display result:

<img class="aligncenter" src="https://github.com/trinhlbk1991/DemoFileStorage/blob/master/images/demostorage4.PNG?raw=true" alt="File Storage in Android" />

After run the application, you can look up the file in device's storage:

Internal:

<img class="aligncenter" src="https://github.com/trinhlbk1991/DemoFileStorage/blob/master/images/demostorage2.PNG?raw=true" alt="File Storage in Android" />

<img class="aligncenter" src="https://github.com/trinhlbk1991/DemoFileStorage/blob/master/images/demostorage3.PNG?raw=true" alt="File Storage in Android" />

External:

<img class="aligncenter" src="https://github.com/trinhlbk1991/DemoFileStorage/blob/master/images/demostorage1.PNG?raw=true" alt="File Storage in Android" />

The whole source code can be found at my Github:

<a href="https://github.com/trinhlbk1991/DemoFileStorage" target="_blank">https://github.com/trinhlbk1991/DemoFileStorage</a>
