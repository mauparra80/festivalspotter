

//return array with {name:'',count:num} for each performer
export const getWordCloudArtists = (festival) => {
  let festivalArtists =  [];


  festival.performer.forEach((performer) => {
   if(!festivalArtists.some(cur => cur.name === performer.name)){
    const artistWordCount = performanceRankToWordCount(performer["x-performanceRank"])
    festivalArtists.push({name: performer.name, count: artistWordCount})
   }
  })

  //sort based on count.
  festivalArtists.sort((a,b) => b.count - a.count);
  return festivalArtists;
}

//get raw rank and inverse it into 1-10 word count.
const performanceRankToWordCount = (rawRank) => {
  switch(true) {
    case (rawRank === 1):
      return 10;
    case (rawRank >= 2 && rawRank <= 10):
      return 5;
    case (rawRank >= 11 && rawRank <= 20):
      return 3
    case (rawRank >= 21 && rawRank <= 40):
      return 2
    case (rawRank >= 41):
      return 1;
  }
}