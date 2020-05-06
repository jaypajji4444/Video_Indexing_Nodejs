const axios=require("axios")
const fs=require("fs")
const fetch=require("node-fetch")

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
            params:{
                "allowEdit":true
            },
            headers:{
                "Ocp-Apim-Subscription-Key":this.subscription_key
            }
        }
        try{
            const url=`https://api.videoindexer.ai/auth/${this.location}/Accounts/${this.account_id}/AccessToken`
            const res=await axios.get(url,config)
            const access_token=res.data
            this.access_token=access_token
            return access_token
            
        }
        catch(err){
            console.log(err)
        }
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
        return await axios(config)
    }

    // Get Video index
    get_video_index=async(params)=>{
        const token_wait=await this.check_access_token();
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
        return await axios(config)
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

        return await axios(config)
    }
}





