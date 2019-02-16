let localStorage = window.localStorage;

function updateSong(id, newSong){
    let songs = getSongs();

    let song = songs.findIndex((song) => {
        return song.id == id;
    });

    songs[song] = {...songs[song], ...newSong};
    setSongs(songs);
}

function createSong(song){
    let songs = getSongs();
    let id = songs.length; //TODO: Change this later

    song.id = id;

    songs.push(song);

    setSongs(songs);
}

function getSongs(){
    return JSON.parse(localStorage.getItem("songs"));
}

function setSongs(songs){
    localStorage.setItem("songs", JSON.stringify(songs));
}

function getSong(id){
    let songs = getSongs();

    return songs.find((song) => {
        return song.id == id;
    });

}

export {setSongs, getSong, getSongs, createSong, updateSong};
