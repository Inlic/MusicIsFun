import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {

  setActiveSearch(id) {
    ProxyState.activeSong = ProxyState.songs.find(s => s._id == id)
  }

  setActivePlaylist(id) {
    ProxyState.activeSong = ProxyState.playlist.find(s => s._id == id)
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get('')
    ProxyState.playlist = res.data.data.map(s => new Song(s));
  }


  async addSong() {
    await sandBoxApi.post('', ProxyState.activeSong)
    ProxyState.playlist.push(ProxyState.activeSong)
    ProxyState.playlist = ProxyState.playlist
    this.getMySongs()
  }

  async removeSong() {
    let id = ProxyState.activeSong._id
    await sandBoxApi.delete(id)
    ProxyState.playlist = ProxyState.playlist.filter(s => s._id != id)
    ProxyState.activeSong = null
  }
}

const service = new SongsService();
export default service;
