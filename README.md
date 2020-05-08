# Video_Indexing_Nodejs 
### Nodejs wrapper for Microsaft Azure's Video Indexer API
 

## Features

- Upload Videos though URL to Microsoft's Video Indexer API.
- Get Insights about the video
- Get Information about Sentimenta, faces , Characters ,transcipts
- Captions from videos
- Thumbnails of videos in "JPEG" or "Base64" .
- Error handling.
#### (More Functionality To Be Added Soon-under development)

## Loading and configuring the module

```js
// CommonJS
const VideoIndexer = require('./Video_indexer/index');

// ES Module
import VideoIndexer from './Video_indexer/index';
```
## Prerequisite
Before Starting to use need you will need to get and store the belowe mentioned stuffs:
1) Login to  https://api-portal.videoindexer.ai/developer and get the  Subscription Key
2) Go to https://www.videoindexer.ai/settings/account and get the Account Id and loacation
3) Store the keys somewhere.

## Usage
### 1) Initialization
```js

// Basic configuration
const Subscription_Key="Your-subscription-key";
const Account_Id="Your-Azure's-account-Id";
const Location="Your-location(Example:'trail')"
// Instantation
const vi = new VideoIndexer(Subscription_Key ,Account_Id ,Location)
```
### 2) Uploading Video :
Any video can can be uploaded through its URL. After Successfull upload ,promise iis returned which can be resolved to get videoId . This Id received can be used to get other information from video.
### Note: 
Only HTTPS Video URL is supported (HTML or any other types are not supported)

```js
// Uploading video
vi.upload_video_to_indexer({
    videoUrl:"Url(https) of the video to upload" // Compulsory,
    language:"English or any other", // Optional(Default:"English"),
    name:"video-name" // Optional
})
.then(res=>{
    console.log("Video Id:",res.videoId)
})
.catch(err=>{
    console.log(err.response.data)
})

```
## 3) Getting Video Indexing Information
```js
// Getting info
vi.get_video_index({
    videoId:"Uploaded video's Id", // Required
    language: "English or any other", // Default : English
    })
.then(data=>{
    console.log(data)
    // Processing Progress :
    console.log(data.videos[0].processingProgress)// 80% ..100%
    })
    .catch(err=>{
            console.log(err.response.data)
    })
```
### Note :Insights won't be generated untill video is processed completely(In case uploading and getting index are called back to back).

## 4) Getting video captions:
```js
vi.get_video_caption({
    videoId:"Uploaded video's Id", // Required
    format:"vtt or txt or csv or srt " // Default: vtt
    language: "English or any other", // Default : English
})
.then(res=>{
    console.log(res.data)
})
.catch(err=>{
      console.log(err.response.data)
})
```

## 5) Getting video Thumbnails:
```js
vi.get_video_thumbnails({
    videoId:"Uploaded video's Id", // Required
    format:" jpeg || base64" // Default:jpeg
})
.then(res=>{
    console.log(res.data)
})
.catch(err=>{
      console.log(err.response.data)
})
```