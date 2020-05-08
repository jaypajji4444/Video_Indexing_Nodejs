const VideoIndexer=require("../Video_Indexer/index");
const chai=require("chai")

const expect=chai.expect;

// Credentials
const subscriptionKey="your-key";
const accountId="acc-id";
const location ="trial";
const videoId="any-video-id";
const thumbnailid="any-video's-thumbnail-id";
const video_url="video-url-to-upload"
// Initilization
const vi= new VideoIndexer(subscriptionKey,accountId,location)

let response;

// Tests
describe("Video Indexer",async()=>{
    describe("1.AccessToken",async()=>{
        beforeEach(async()=>{
        response = await vi.get_access_token()
        })
        it("status",async(done)=>{
            expect(response).to.have.property("status").eql(200)
            done()
        })
        it("data",async(done)=>{
            expect(response).to.have.property("data")
            done()
        })
    })

    describe("2.Upload Video",async()=>{
        beforeEach(async()=>{
            response= await vi.upload_video_to_indexer({video_url})
        })
        it("VideoId",async(done)=>{
            expect(response).to.have.property("videoId")
            done()
        })
    })

    describe("3.Video Info",async()=>{
        beforeEach(async()=>{
            response= await vi.get_video_index({videoId})
        })
        it("videos",async(done)=>{
            expect(response).to.have.property("videos").to.be.a("array")
            done()
        })
        it("videoId Match",async()=>{
            expect(response).to.have.property("id").eql(videoId)
        })
    })



    describe("4.Video Captions",async()=>{
        beforeEach(async()=>{
            response= await vi.get_video_caption({videoId})
        })
        it("status",async(done)=>{
            expect(response).to.have.property("status").eql(200)
            done()
        })
    })


    describe("5.Video Thumbnails",async()=>{
        beforeEach(async()=>{
            response= await vi.get_video_thumbnails({videoId,thumbnailid})
        })
        it("status",async(done)=>{
            expect(response).to.have.property("status").eql(200)
            done()
        })
    })


})