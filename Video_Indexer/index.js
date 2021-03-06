const axios=require("axios")

class VideoIndexer{
    constructor(subscription_key,account_id,location=null){
        this.subscription_key=subscription_key;
        this.account_id=account_id;
        this.location=location
        this.access_token=null
    }

    // Accessing the token for API calls
    get_access_token=async()=>{
        const config={
            method:"GET",
            url:`https://api.videoindexer.ai/auth/${this.location}/Accounts/${this.account_id}/AccessToken`,
            params:{
                "allowEdit":true
            },
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            }
        }

            const response=await axios(config)

            if(response.status==200){
                const access_token=response.data
                this.access_token=access_token
                return response
            }
            // Error Handlig
            throw new Error(response.data)
        }

    // Checking whether access token is saved or not
    check_access_token=async ()=>{
        if(this.access_token==null){
            await this.get_access_token()
        }
    }

    // Uploadin the Video
    upload_video_to_indexer=async(params)=>{
        const token_wait=await this.check_access_token()
        if(!params.video_name){
            params.video_name=`vi-${Date.now()}`
        }
        if(!params.language)params.language="English"
        // Configuaration
        let url=`https://api.videoindexer.ai/${this.location}/Accounts/${this.account_id}/Videos`
        const config={
            url:url,
            method: "POST",
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            },
            params : {
                streamingPreset: 'Default',
                indexingPreset: 'DefaultWithNoiseReduction',
                language: params.video_language,
                name: params.video_name,
                accessToken: this.access_token,
                videoUrl: params.video_url
            }
        }
        
            const response = await axios(config)
            if(response.status==200)
            {
                return {videoId:response.data.id};
            }
            throw new Error(response.data)
        
        
    }

    // Get Video index
    get_video_index=async(params)=>{
        await this.check_access_token();
        // Checking the video id is provided or not
        if(params===undefined || params.videoId===undefined){
            console.log("Video id is required...")
        }
        // Setting default language to english
        if(!params.language){
            params.language="English"
        }
        
        const url=`https://api.videoindexer.ai/${this.location}/Accounts/${this.account_id}/Videos/${params.videoId}/Index`
        // Configurations
        const config={
            url:url,
            method:"GET",
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            },
            params:{
                ...params,
                accessToken: this.access_token,
            }
        }
        const response= await axios(config)
        if(response.status==200){
            const data=response.data
        // check status if get_info called immediately after uploading
        if(data.state=="Processing"){
            console.log("Video under processing...")
            console.log("Progress : ",data.videos[0].processingProgress)
        }
        return response.data;
        }
        throw new Error(response.data)
}

    // Get Captions from Videos
    get_video_caption=async(params)=>{
        await this.check_access_token()
        if(params.language===undefined){
            params.language="English"
        }
        if(params.format===undefined){
            params.format="vtt"
        }
        const url=`https://api.videoindexer.ai/${this.location}/Accounts/${this.account_id}/Videos/${params.videoId}/Captions`
        // Configuration
        const config={
            url:url,
            method:"GET",
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            },
            params:{
                ...params,
                accessToken:this.access_token
            }
        }
        const response= await axios(config)
        if(response.status==200){
            return response 
        }
        // Error 
        throw new Error(response.data)
    }


     // Get Thubnails from Videos
    get_video_thumbnails=async(params)=>{
        await this.check_access_token()
        if(params.format===undefined){
            params.format="jpeg"
        }

        const url=`https://api.videoindexer.ai/${this.location}/Accounts/${this.account_id}/Videos/${params.videoId}/Thumbnails/${params.thumbnailId}`
        // Configuration
        const config={
            url:url,
            method:"GET",
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            },
            params:{
                ...params,
                accessToken:this.access_token
            }
        }

        const response=await axios(config)
        
        if(response.status==200){
            return response
        }
        // Error
        throw new Error(response.data)
    }
}




module.exports=VideoIndexer