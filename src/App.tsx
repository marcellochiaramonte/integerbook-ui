import {useEffect,useState} from 'react'

interface Song {
  title:string
  linkToSheet: string 
}

const App = ()=> {

  const [songList, setSongList]: [Array<Song>,any] = useState([])

  useEffect(()=>{
    fetch('sheets.json').then(async (res)=>{

      const songListFromFile = await res.json()

      const list: Array<Song> = []

      {Object.keys(songListFromFile).forEach((songTitle:string)=>{
        list.push({
          title: songTitle.replace('.musicxml',''),
          linkToSheet: songListFromFile[songTitle]
        })
      })}

      setSongList(list)
    })
  },[])

  return (

    <div>
      <div>
        Search: <input type="text" />
      </div>
      <div>
      {songList.map(song=>{
        return <div key={JSON.stringify(song)}>{song.title}</div>
      })}
      </div>
   
    </div>
  )
}

export default App
