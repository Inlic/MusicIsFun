import songService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ``
  ProxyState.songs.forEach(s => template += s.Template)
  document.getElementById('songs').innerHTML = template
}

function _drawActive() {
  if (ProxyState.activeSong) {
    document.getElementById('active-song').innerHTML = ProxyState.activeSong.ActiveTemplate
  } else {
    document.getElementById('active-song').innerHTML = ""
  }
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ``
  ProxyState.playlist.forEach(s => template += s.playlistTemplate)
  document.getElementById('playlist').innerHTML = template
}



//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your listeners and get your data
    ProxyState.on("songs", _drawResults)
    ProxyState.on("activeSong", _drawActive)
    ProxyState.on("playlist", _drawPlaylist)
    this.getMySongs()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  getMySongs() {
    try {
      songService.getMySongs()
    } catch (error) {
      console.error(error);
    }
  }

  setActiveSearch(id) {
    songService.setActiveSearch(id)
  }

  setActivePlaylist(id) {
    songService.setActivePlaylist(id)
  }


  addSong() {
    songService.addSong()
  }


  removeSong() {
    songService.removeSong()
  }
}
