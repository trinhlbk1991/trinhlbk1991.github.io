---
title: "Android Data Encryption using Jetpack Security"
date: 2020-12-25
categories: ["android"]
tags: ["Jetpack","Jetpack Security"]
summary: "Encrypt sensitive data in Android using Jetpack Security library for EncryptedSharedPreferences and EncryptedFile."
toc: true
comments: true
---

## Android Data Encryption using Jetpack Security

![Photo by [Philipp Katzenberger](https://unsplash.com/@fantasyflip?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/12000/0*BhOyox2JDDK95760)

As an Android developer, you probably want to encrypt your application data at some points for security reasons. Those sensitive data can be varied from personal identifiable information (PII), financial records, to enterprise-related data.

By using Jetpack Security (JetSec), you can easily encrypt Files and SharePreferences locally to protect your sensitive information.

## Include JetSec into the project

To use JetSec in your project, just simply adding the dependencies below in your app’s build.gradle:

```gradle
    dependencies {
        implementation "androidx.security:security-crypto:1.0.0-rc03"
    }
```

## Key Generation

JetSec library uses the 2-part system for key management:

* **Keyset**: contains all the keys to encrypt files or shared preferences data

* **Master Key**: the key to encrypt all keyset items

Before doing any cryptographic operation, you have to generate the key first.

Out of the box, JetSec provides the default master key within the MasterKey class with the AES256_GCM_SPEC specification. The master key is generated and stored in the [Android Keystore](https://developer.android.com/training/articles/keystore) system, which makes it difficult to extract the key material.

```kotlin
    val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)
```

The default master key should be fine for general purposes. In case you want to create a master key with a [custom specification](https://developer.android.com/reference/androidx/security/crypto/MasterKey.Builder), JetSpec also supports that:

```kotlin
    val customSpec = KeyGenParameterSpec.Builder(
            "master_key",
            KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT
    )
            .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
            .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
            .setKeySize(256)
            .setUserAuthenticationRequired(true)
            .setUserAuthenticationValidityDurationSeconds(60)
            .apply {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                    setUnlockedDeviceRequired(true)
                    setIsStrongBoxBacked(true)
                }
            }
            .build()
    
    val masterKeyAlias = MasterKeys.getOrCreate(customSpec)
```

## EncryptedSharedPreferences

If you need to save data in the key-value format securely, JetSpec provides EncryptedSharedPreferences which share the same interface with the normal SharedPreferences.

Using EncryptedSharedPreferences, both keys and values are encrypted:

* **Keys**: encrypted with deterministic encryption so that it can be looked up

* **Values**: encrypted using [AES-256 GCM](https://tools.ietf.org/html/rfc5116#section-5.2) and not deterministic

The below code snippets show you how to edit a record of the encrypted shared preferences:

```kotlin
    val sharedPrefs: SharedPreferences = EncryptedSharedPreferences.create(
            "secured_shared_prefs",
            masterKeyAlias,
            applicationContext,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )
    
    sharedPrefs.edit()
            .putString("auth_token", "random_auth_token")
            .apply()
```

And the result 🎉

![](https://cdn-images-1.medium.com/max/4236/1*2r3zr9G2jivz0QwhWteAsQ.png)

## EncryptedFile

The EncryptedFile class provides custom implementation of FileInputStream and FileOutputStream, allows you to read and write encrypted files easier.

To provide secure read and write operations from file streams, JetSec uses the Streaming Authenticated Encryption with Associated Data (AEAD) primitive. The data is divided into chunks and encrypted using AES256-GCM.

The below code snippets show you how to write data into file securely:

```kotlin
    val fileToWrite = File(getDir("sensitive_data", MODE_PRIVATE), "encrypted_data.txt")
    val encryptedFile = EncryptedFile.Builder(
            fileToWrite,
            applicationContext,
            masterKeyAlias,
            EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
    ).build()
    
    val fileContent = "Hello world!"
            .toByteArray(StandardCharsets.UTF_8)
    
    encryptedFile
            .openFileOutput()
            .run {
                write(fileContent)
                flush()
                close()
            }
```

… and read encrypted data from a file securely:

```kotlin
    val fileToRead = File(getDir("sensitive_data", MODE_PRIVATE), "encrypted_data.txt")
    val encryptedFile = EncryptedFile.Builder(
            fileToRead,
            applicationContext,
            masterKeyAlias,
            EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
    ).build()
    
    val byteArrayOutputStream = ByteArrayOutputStream()
    encryptedFile.openFileInput().run {
        var nextByte: Int = read()
    
        while (nextByte != -1) {
            byteArrayOutputStream.write(nextByte)
            nextByte = read()
        }
    
        close()
    }
    
    val plaintext = String(byteArrayOutputStream.toByteArray())
```

And the result 🎉

![](https://cdn-images-1.medium.com/max/4116/1*TrckV0_RgShNaKMn6cu4PQ.png)

If you have any feedback/corrections, please feel free to leave a comment below.

Thanks for reading and happy coding! 💻