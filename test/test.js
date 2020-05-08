const VideoIndexer=require("../Video_Indexer/index");
const chai=require("chai")

const expect=chai.expect;

// Credentials
const subscriptionKey="e71fb83590ea4fe3bbe069a1a7faaada";
const accountId="9ddc8b28-5fa9-4421-8261-1503f0ee3d24";
const location ="trial";
const vi= new VideoIndexer(subscriptionKey,accountId,location)

// Subsc
let response;
describe("Video Indexer",async()=>{
    // describe("1.AccessToken",async()=>{
    //     beforeEach(async()=>{
    //     response = await vi.get_access_token()
    //     })
    //     it("status",async(done)=>{
    //         expect(response).to.have.property("status").eql(200)
    //         done()
    //     })
    //     it("data",async(done)=>{
    //         expect(response).to.have.property("data")
    //         done()
    //     })
    // })

    // describe("2.Upload Video",async()=>{
    //     beforeEach(async()=>{
    //         response= await vi.upload_video_to_indexer({video_url:"https://www.radiantmediaplayer.com/media/bbb-360p.mp4"})
    //     })
    //     it("VideoId",async(done)=>{
    //         expect(response).to.have.property("videoId")
    //         done()
    //     })
    // })

    // describe("3.Video Captions",async()=>{
    //     beforeEach(async()=>{
    //         response= await vi.get_video_caption({videoId:"8494eae701"})
    //     })
    //     it("status",async(done)=>{
    //         expect(response).to.have.property("status").eql(200)
    //         done()
    //     })
    // })


    describe("4.Video Thumbnails",async()=>{
        beforeEach(async()=>{
            response= await vi.get_video_thumbnails({videoId:"8494eae701",thumbnailid:"21d79c37-1dc3-4634-888d-0bd047fb4626"})
        })
        it("status",async(done)=>{
            console.log(response.status)
            expect(response).to.have.property("status").eql(200)
            done()
        })
    })


})