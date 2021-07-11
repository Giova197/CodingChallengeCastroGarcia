<template>
  <div class="HelloWorld">
    <input type="text" placeholder="Select the artist" v-model="artist" v-on:change="fetchAlbums" />
    <input type="text" placeholder="Select the album" v-model="albumFilterName" v-on:keydown="changeAlbumName" />
    <ul>
      <div class="container">
        <header class="header">
        <p>Album List: </p>
        </header>
        <section class="articoli">
        <article>
      <li v-for="item in filteredAlbums" :key="item.album">
        {{ item.album }}
      </li>
      </article>
    </section>
      <footer class="footer">
        <small>There are no more albums.</small>
    </footer>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      albums: [],
      filteredAlbums: [],
      albumFilterName: '',
      artist: ''
    }
  },
  methods: {
    fetchAlbums (event) {
      this.albumFilterName = ''
      fetch(`http://localhost:3000/${event.target.value}`)
        .then(response => response.json())
        .then(data => {
          this.albums = data
          this.filteredAlbums = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    changeAlbumName (event) {
      let name = event.target.value.replace(' ', '').toLowerCase()
      this.filteredAlbums = this.albums
        .filter(curr => curr.album.replace(' ', '').toLowerCase().includes(name))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container{
    color:black;
    display: grid;
    grid-template-rows: 150px auto 150px;
    grid-template-columns: 25%;
    grid-template-areas:
    "sidebar content"
    "footer footer";
}
.container{
    display: grid;
    grid-template-rows: 50px auto 50px;
    grid-template-columns: 0% 75%;
    grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}

.header{
    grid-area: header;
    background-color: #7e7b7b;
}

.articoli{
    grid-area: content;

    background-color: #eff0f5;
}

aside{
    grid-area: sidebar;
    background-color: #797a79;
}

.footer{
    grid-area: footer;
    background-color: #70706e;
}
</style>
