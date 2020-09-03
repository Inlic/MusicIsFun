import { generateId } from "../Utils/GenerateId.js"


export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title || "Title not found";
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300") || "//placehold.it/100x100";
    this.artist = data.artistName || data.artist || "Artist not Found";
    this.album = data.collectionName || data.album || "Album not Found";
    this.price = data.trackPrice || data.price || 0;
    this.preview = data.previewUrl || data.preview || "http.cat/404";
    this._id = data.trackId || data._id || generateId();
    this.sandbox = false
    if (data.user) {
      this.sandbox = true
    }
  }

  get Template() {
    return `
          <div class="card my-1" onclick="app.songsController.setActiveSearch('${this._id}')">
          <div class="card-body d-flex flex-direction-column">
            <img class="search-result" src="${this.albumArt}" alt="">
            <div class=" my-auto">
              <h5 class="card-title">${this.title} - ${this.artist}</h5>
              <p class="card-text">$${this.price}</p>
              <a href="${this.preview}">preview</a>
              </div>
            </div>
          </div>
        `;
  }

  get ActiveTemplate() {
    return `
    <div class="card my-1">
          <div class="card-body text-center">
            <img src="${this.albumArt}" alt="">
            <div class=" my-auto">
              <h5 class="card-title">${this.title} - ${this.artist}</h5>
              <p class="card-text">$${this.price}</p>
              <a href="${this.preview}">preview</a>
              </div>
            </div>
            ${this.buttonTemplate}
          </div>
    `
  }

  get playlistTemplate() {
    return `
        <div class="card my-1" onclick="app.songsController.setActivePlaylist('${this._id}')">
          <div class="card-body d-flex flex-direction-column">
            <img class="search-result" src="${this.albumArt}" alt="">
            <div class=" my-auto">
              <h5 class="card-title">${this.title} - ${this.artist}</h5>
              <p class="card-text">$${this.price}</p>
              <a href="${this.preview}">preview</a>
              </div>
            </div>
          </div>
        `;
  }

  get buttonTemplate() {
    if (this.sandbox) {
      return `<button type="button" class="btn btn-danger" onclick="app.songsController.removeSong()">Remove song from Playlist</button>`
    }
    return `<button type="button" class="btn btn-primary" onclick="app.songsController.addSong()">Add song to Playlist</button>`
  }
}
