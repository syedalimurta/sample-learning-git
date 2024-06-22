let api_key='AIzaSyBvCDW-WD84qbUwwR1MgKBGw4DwqUOWtRQ'
let video_http='https://www.googleapis.com/youtube/v3/videos?';
let channel_HTTP='https://www.googleapis.com/youtube/v3/channels?'
let serachbar=document.querySelector('#searchbar')
let serachBTN=document.querySelector('.search')
let content=document.querySelector('.content')
fetch(video_http + new URLSearchParams({
  key:api_key,
  part:'snippet',
  maxResults:12,
  chart:'mostpopular',
  regionCode:'US'

}))
.then((res)=> res.json())
.then((data)=>{
  data.items.forEach(item => {
   getchannelIcon(item);
  });
})
const getchannelIcon=(video_data)=>{
 
fetch(channel_HTTP + new URLSearchParams({
  key:api_key,
  part:'snippet',
  id:video_data.snippet.channelId,
}))
.then((res)=>res.json())
.then((data)=>{
  video_data.channelthumbnail=data.items[0].snippet.thumbnails.default.url
  makevideos(video_data)
})
}
const makevideos=(video_data)=>{
content.innerHTML+=`
<div class="videos">
      <div class="video_content" onclick="bb('${video_data.id}')">
      <div class="image">
        <img src="${video_data.snippet.thumbnails.high.url}" alt="">
      </div>
      <div class="video-detail">
        <img src="${video_data.channelthumbnail}" alt="">
        <h2>c${video_data.snippet.title}</h2>
      </div>
      <div class="channel_detail">
        <p>${video_data.snippet.channelTitle}</p>
      </div>
    </div>
`
}
function bb(video_data) {
  location.href=`https://www.youtube.com/watch?v=${video_data}`
}
serachBTN.addEventListener('click',()=>{
  location.href=`https://www.youtube.com/results?search_query=${serachbar.value}`
})