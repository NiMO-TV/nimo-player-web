# nimo-player-web

## Non-Interactive Inline Frames for Live Streams, VODs and Clips
With the Nimo Embedded Player, you can embed the Nimo video player on your own website. The method to embed an iFrame tag on a web page is simpler and faster than calling API using Javascript or Flash.
```html
<iframe
    src="https://www.nimo.tv/embed/<channel ID, video ID, clip ID>"
    height="<height>"
    width="<width>"
    frameborder="<frameborder>"
    scrolling="<scrolling>"
    allowfullscreen="<allowfullscreen>">
</iframe>
```

### Device Adaption
|Name|URL|Description|
|:--|:--|:--|
|Desktop Embed Player|https://www.nimo.tv/embed/<channel ID, video ID, clip ID>|It will automatically redirect to the Mobile Embed player according to the User Agent Detection.|
|Mobile / Tablet|https://m.nimo.tv/embed/<channel ID, video ID, clip ID>|It will automatically redirect to the Desktop Embed player according to the User Agent Detection.|

### Browser Adaption
It only support the HTML player. The Flash player is no longer supported.

### Iframe Attributes
These attributes are defined in the IFrame element. The Nimo player can not set or modify them.

<table><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>allowfullscreen</code></td><td>boolean</td><td>If <code>true</code>, the player can go full screen.</td></tr><tr><td><code>height</code></td><td>integer</td><td>Height of the embedded window, in pixels. Recommended minimum: 300</td></tr>
<!-- <tr><td><code>parent</code></td><td>string</td><td><strong>(required)</strong> Domain(s) that will be embedding Twitch. You must have one parent key for each domain your site uses.</td></tr> -->
<tr><td><code>scrolling</code></td><td>boolean</td><td>Indicates when the browser should provide a scroll bar (or other scrolling device) for the frame. Recommended: <code>no</code>.</td></tr><tr><td><code>src</code></td><td>string</td><td>The iframe <code>src</code> URL string should be https://www.nimo.tv/embed/{channel, video, clip} with one of these required url paths:<ul><li><code>channel</code> – (string) Name of the channel, for a live stream.</li><li><code>video</code> – (string) Video ID (for past broadcasts, highlights, and video uploads). In this context (the video player), the video ID must have a “v” prefix.</li><li><code>clip</code> - (string) Clip ID, for a clip of live stream. In this context (the video player), the Clip ID must have a “v” prefix.</li></ul></td></tr><tr><td><code>width</code></td><td>integer</td><td>Width of the embedded window, in pixels. Recommended minimum: 400</td></tr></tbody></table>

### Optional Query String Parameters on Iframe <code>src</code>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>_lang</code></td>
      <td>integer(MS-LCID)</td>
      <td>We use MS-LCID as our language code. It is the language to be used in the interface. It is expressed as the language of the control bar. When this parameter is not set, it is determined automatically according to the accept-language in the Http Request Header. The default value is English.</td>
    </tr>
    <tr>
      <td><code>_clang</code></td>
      <td>integer(MS-LCID)</td>
      <td>It is the language of the live stream content. The recommended channels will depends on this.</td>
    </tr>
  </tbody>
</table>

### MS-LCID
The list of language <-> MS-LCID.
```json
{
  "1025": "ar",
  "1028": "zh",
  "1033": "en",
  "1034": "es",
  "1041": "ja",
  "1046": "pt",
  "1049": "ru",
  "1054": "th",
  "1055": "tr",
  "1057": "id",
  "1066": "vi",
  "1081": "hi",
  "1086": "ms",
  "1124": "fil"
}
```

## Interactive Frames for Live Streams, VODs and Clips

```html
<script src= "https://www.nimo.tv/sdk/embed-player-0.3.2.min.js"></script>
<div id="<player div ID>"></div>
<script type="text/javascript">
  var options = {
    width: <width>,
    height: <height>,
    resourceId: "<channel ID> or <video ID> or <clip ID>"
  };
  var player = new NimoTV.Player("<player div ID>", options);
</script>
```

### Required Parameters
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>channel</code><br>– OR –<br><code>video</code><br>– OR –<br><code>clip</code></td>
      <td>string or integer</td>
      <td>Channel ID (for a live stream), video ID, or clip ID. 
      <!-- (To change the channel or video later, use <code>setChannel</code>, <code>setVideo</code>, or <code>setCollection</code>; see <a href="#synchronous-javascript-playback-api">Synchronous Playback Controls</a>.) --></td>
    </tr>
    <tr>
      <td><code>height</code></td>
      <td>integer</td>
      <td>Height of the embedded window, in pixels. Recommended minimum: 300.</td>
    </tr>
    <!-- <tr>
      <td><code>parent</code></td>
      <td>string[]</td>
      <td><strong>Only required if your site is embedded on any domain(s) other than the one that instantiates the Twitch embed.</strong> Example <code>parent</code> parameter: <code>["streamernews.example.com", "embed.example.com"]</code></td>
    </tr> -->
    <tr>
      <td><code>player div ID</code></td>
      <td>string</td>
      <td>Any value you like, as long as it is the same in both locations within the example.</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>integer</td>
      <td>Width of the embedded window, in pixels. Recommended minimum: 400.</td>
    </tr>
  </tbody>
</table>

### Optional Parameter
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <!-- <tr>
      <td><code>playsinline</code></td>
      <td>boolean</td>
      <td>If <code>true</code>, the embedded player plays inline for mobile iOS apps. Default: <code>true</code>.</td>
    </tr> -->
    <tr>
      <td><code>lang</code></td>
      <td>integer(MS-LCID)</td>
      <td>We use MS-LCID as our language code. It is the language to be used in the interface. It is expressed as the language of the control bar. When this parameter is not set, it is determined automatically according to the accept-language in the Http Request Header. The default value is English.</td>
    </tr>
  </tbody>
</table>

### Synchronous JavaScript Playback API
<table>
  <thead>
    <tr>
      <th>Call</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>pause():void</code></td>
      <td>Pauses the player.</td>
    </tr>
    <tr>
      <td><code>play():void</code></td>
      <td>Begins playing the specified video.</td>
    </tr>
    <tr>
      <td><code>destroy():void</code></td>
      <td>Removes the <code>&lt;iframe&gt;</code> containing the player.</td>
    </tr>
    <!-- <tr>
      <td><code>seek(timestamp:Float):void</code></td>
      <td>Seeks to the specified <code>timestamp</code> (in seconds) in the video and resumes playing if paused. Does not work for live streams.</td>
    </tr>
    <tr>
      <td><code>setChannel(channel:String):void</code></td>
      <td>Sets the channel to be played.</td>
    </tr>
    <tr>
      <td><code>setCollection(collection ID:String, video ID:String):void</code></td>
      <td>Sets the collection to be played.<br><br>Optionally also specifies the video within the collection, from which to start playback. If a video ID is not provided here or the specified video is not part of the collection, playback starts with the first video in the collection.</td>
    </tr>
    <tr>
      <td><code>setQuality(quality:String):void</code></td>
      <td>Sets the quality of the video. <code>quality</code> should be a string value returned by <code>getQualities</code>.</td>
    </tr>
    <tr>
      <td><code>setVideo(video ID:String, timestamp:Number):void</code></td>
      <td>Sets the video to be played to be played and starts playback at <code>timestamp</code> (in seconds).</td>
    </tr> -->
  </tbody>
</table>

<!-- ### Synchronous JavaScript Volume API
<table>
  <thead>
    <tr>
      <th>Call</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getMuted():Boolean</code></td>
      <td>Returns <code>true</code> if the player is muted; otherwise, <code>false</code>.</td>
    </tr>
    <tr>
      <td><code>setMuted(muted:Boolean):void</code></td>
      <td>If <code>true</code>, mutes the player; otherwise, unmutes it. This is independent of the volume setting.</td>
    </tr>
    <tr>
      <td><code>getVolume():Float</code></td>
      <td>Returns the volume level, a value between 0.0 and 1.0.</td>
    </tr>
    <tr>
      <td><code>setVolume(volumelevel:Float):void</code></td>
      <td>Sets the volume to the specified volume level, a value between 0.0 and 1.0.</td>
    </tr>
  </tbody>
</table> -->

<!-- ### Synchronous JavaScript Status API
<table>
  <thead>
    <tr>
      <th>Call</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getChannel():String</code></td>
      <td>Returns the channel’s name. Works only for live streams, not VODs.</td>
    </tr>
    <tr>
      <td><code>getCurrentTime():Float</code></td>
      <td>Returns the current video’s timestamp, in seconds. Works only for VODs, not live streams.</td>
    </tr>
    <tr>
      <td><code>getDuration():Float</code></td>
      <td>Returns the duration of the video, in seconds. Works only for VODs,not live streams.</td>
    </tr>
    <tr>
      <td><code>getEnded():Boolean</code></td>
      <td>Returns true if the live stream or VOD has ended; otherwise, false.</td>
    </tr>
    <tr>
      <td><code>getQualities():String[]</code></td>
      <td>Returns the available video qualities. For example, <code>chunked</code> (pass-through of the original source).</td>
    </tr>
    <tr>
      <td><code>getQuality():String</code></td>
      <td>Returns the current quality of video playback.</td>
    </tr>
    <tr>
      <td><code>getVideo():String</code></td>
      <td>Returns the video ID. Works only for VODs, not live streams.</td>
    </tr>
    <tr>
      <td><code>isPaused():Boolean</code></td>
      <td>Returns true if the video is paused; otherwise, false. Buffering or seeking is considered playing.</td>
    </tr>
  </tbody>
</table> -->

<!-- ### Asynchronous JavaScript Status API
<table>
  <thead>
    <tr>
      <th>Call</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>getState():Promise</code></td>
      <td>Returns the player's state. Return: { state: 1 }.
      <br>Number definitions:
      <li> -1, unstarted; video has not yet started playing</li>
      <li> 0, ended; video has ended (either live or a vod video or a clip video)</li>
      <li> 1, playing; video is playing</li>
      <li> 2, paused: video is paused</li>
      <li> 3, buffering: video is currently buffering</li>
      </td>
    </tr>
  </tbody>
</table> -->

### JavaScript Events
To listen to events, call <code>addEventListener(event:String, callback:Function)</code>.
<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Emitted when …</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>NimoTV.Player.ENDED</code></td>
      <td>Video or stream ends.</td>
    </tr>
    <tr>
      <td><code>NimoTV.Player.PAUSE</code></td>
      <td>Player is paused. Buffering and seeking is not considered paused.</td>
    </tr>
    <tr>
      <td><code>NimoTV.Player.PLAY</code></td>
      <td>Player just unpaused, will either start video playback or start buffering.</td>
    </tr>
    <!--<tr>
      <td><code>Twitch.Player.PLAYBACK_BLOCKED</code></td>
      <td>Player playback was blocked. Usually fired after an unmuted autoplay or unmuted programmatic call on <code>play()</code>.</td>
    </tr>
    <tr>
      <td><code>Twitch.Player.PLAYING</code></td>
      <td>Player started video playback.</td>
    </tr>
    <tr>
      <td><code>Twitch.Player.OFFLINE</code></td>
      <td>Loaded channel goes offline.</td>
    </tr>
    <tr>
      <td><code>Twitch.Player.ONLINE</code></td>
      <td>Loaded channel goes online.</td>
    </tr>
    <tr>
      <td><code>Twitch.Player.READY</code></td>
      <td>Player is ready to accept function calls.</td>
    </tr> -->
  </tbody>
</table>

### Example
```html
<script src= "https://www.nimo.tv/sdk/embed-player-0.3.2.min.js"></script>
<div id="SamplePlayerDivID"></div>
<script type="text/javascript">
  var options = {
    width: 900,
    height: 400,
    resourceId: 6173062192,
  };
  var player = new NimoTV.Player("SamplePlayerDivID", options);
  player.play();
</script>
```

