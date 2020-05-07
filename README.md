# Video_Indexing_Nodejs
Nodejs wrapper for Microsaft Azure's Video Indexer API


## Features

- Upload Videos though URL to Microsoft's Video Indexer API.
- Get Insights about the video
- Get Information about Sentimenta, faces , Characters ,transcipts
- Captions from videos
- Thumbnails of videos in "JPEG" or "Base64" .
- Error handling.
<<<<<<< HEAD

## Loading and configuring the module

```js
// CommonJS
const VideoIndexer = require('node-video-indexer');

// ES Module
import VideoIndexer from 'node-video-indexer';
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
Any video can can be uploaded through its URL. After Successfull upload Id is received which can be used to get other information from video.
### Note: 
Only HTTPS Video URL is supported (HTML or any other types are not supported)


 
=======
>>>>>>> 71d3c762b80df0e08eb2e57a498190e4a16f4392
