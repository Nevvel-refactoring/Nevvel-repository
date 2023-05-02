import React from 'react' 
import { episode } from 'editor'

type viwerMainProps = {
    PostEpisode:episode,
    array:[]
}
function ViewerMain({PostEpisode}:viwerMainProps) {
    const contents = PostEpisode.contents
    
    console.log(contents)
  return (
    <div>
        {contents.map((content,index)=>
        <div key={index}>
            {content.context}
        </div>)}
    </div>
  )
}

export default ViewerMain