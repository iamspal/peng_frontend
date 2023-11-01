export async function getGifs() {
  try {
    let result = await fetch(import.meta.env.VITE_IMAGE_CLICKER_API_URL + 'images')
    result = await result.json()
    return result.data
  } catch {
    alert('Error fetching gifs')
    return []
  }
}

export async function upVoteGif(id) {
  try {
    const form = new FormData()
    form.append('id', id)
    let result = await fetch(import.meta.env.VITE_IMAGE_CLICKER_API_URL + 'vote', {
      method: 'POST',
      body: form
    })
    result = await result.json()
    return result.success
  } catch {
    alert("Error up vote gif");
    return false
  }
}
