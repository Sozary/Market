import axios from "axios"
export default abstract class Images {

  public static async getImage(name: string) {
    var results
    do {
      let res = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.google.com/search?q=${name}&tbm=isch`, {
        headers: {
          origin: "https://cors-anywhere.herokuapp.com",
          "x-requested-with": "XMLHttpRequest"
        }
      })
      let parser = new DOMParser()
      let data = parser.parseFromString(res.data, "text/html")
      results = Array.from(data.querySelectorAll('.rg_di .rg_meta')).map(el => JSON.parse(el.textContent).ou);
    } while (results.length == 0)

    return results.filter(e => e != null)[0]
  }
}
