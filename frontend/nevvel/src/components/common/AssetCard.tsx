import React, { useRef, useState } from "react";
import styled from "styled-components";

interface AssetTag {
  id : number,
  name : string,
}

interface Asset {
  id: number,
  title: string,
  type: string,
  thumbnail : string,
  url: string,
  tags: Array<AssetTag>,
}

function AssetCard({
  id,
  title,
  type,
  thumbnail,
  url,
  tags,
} : Asset) {

  const audioRef = useRef<any>(null)


  const [hoverTrigger, setHoverTrigger] = useState(0)

  const ImgTriggerOn = () => {
    setHoverTrigger(1)
  }
  const ImgTriggerOff = () => {
    setHoverTrigger(0)
  }
  const AudTriggerOn = () => {
    setHoverTrigger(1)
    audioRef.current.play()    
  }
  const AudTriggerOff = () => {
    setHoverTrigger(0)
    audioRef.current.pause() 
  }

  return(
    
    <Wrapper>
      <CardImgDiv>
        <audio ref={audioRef} src={`${url}`} />
        {
          type === "AUDIO"?
          (
            hoverTrigger === 0?
            <CardImg src="https://cdn4.iconfinder.com/data/icons/proglyphs-multimedia/512/Volume_Off-512.png" alt="썸네일" onMouseOver={AudTriggerOn} />
            :
            <CardImg src={thumbnail} alt="썸네일" onMouseLeave={AudTriggerOff} />
          )
          :
          (
            hoverTrigger === 0?
            <CardImg src={thumbnail} alt="썸네일" onMouseOver={ImgTriggerOn} />:
            <CardImg src={url} alt="썸네일" onMouseLeave={ImgTriggerOff} />
          )
        }
      </CardImgDiv>
      <CardInfo1>{title}</CardInfo1>
      <CardInfo2>
        {
          tags.slice(0,3).map((tag, index:number) => {
            return (
              <CardInfo2Div>#{tag.name}</CardInfo2Div>
            )
          })
        }
        {/* {tags[0].name} */}
      </CardInfo2>
    </Wrapper>
  )
}

export default AssetCard


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  /* flex-direction: column; */
  width: 18%;
  height: 100%;
  margin-top: 1%;
  margin-bottom: 5%;
  margin-right: 1%;
  margin-left: 1%;
  border-radius: 1rem;
  /* background-color: #C1C2FF; */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const CardImgDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 2.5%;
  margin-right: 2.5%;
`

const CardImg = styled.img`
  width: 100%;
  height: 30vh;
  border-radius: 5%;
`
const CardInfo1 = styled.p`
  color: ${({ theme }) => theme.color.text1};
  width: 100%;
  height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5%;
  font-size: 150%;
  text-align: center;
  /* margin-left: 2.5%; */
  /* margin-right: 2.5%; */
`

const CardInfo2 = styled.p`
  color: ${({ theme }) => theme.color.text1};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5%;
  font-size: 100%;
  display: flex;
  justify-content: left;
  /* margin-left: 10%; */
`

const CardInfo2Div = styled.div`
  background-color: white;
  color: black;
  width: 4rem;
  height: 2rem;
  border-radius: 0.5rem;
  /* box-shadow: 0.5rem 0.5rem 0.2rem; */
  border: 0.15rem inset black;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`