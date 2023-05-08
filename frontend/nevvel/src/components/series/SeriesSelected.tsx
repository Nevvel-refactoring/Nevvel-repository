import React from 'react'
import { cover } from 'series'

type SeriesSelectedProps = {
    Info: cover
}

function SeriesSelected({ Info }: SeriesSelectedProps) {
    const episodes = Info.episodes
    return (
        <div>
            {episodes.map((episode, index) =>

                <div key={index}>
                    {episode.title}
                </div>
            )}

        </div>
    )
}

export default SeriesSelected
