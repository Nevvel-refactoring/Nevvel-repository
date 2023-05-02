import React from 'react'
import { episode } from 'editor'

type ViewerHeadProps ={
    PostEpisode:episode
}

function ViewerHead({PostEpisode}:ViewerHeadProps) {
  return (
    <div>
        {PostEpisode.title}
    </div>
  )
}

export default ViewerHead