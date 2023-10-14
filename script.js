const count = 10
const apiKey = 'n6JE7rFy7eEoKXntcE2e0QNOYPgsorOCcMIS8s08cwg'
const URL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`
const imageContainer = document.getElementById('image-container')
async function getImages () {
  const response = await fetch(URL)
  const data = await response.json()
  console.log(data)
  return data
}

function addAltToTag (source, image) {
  const alt = source.alt_description
  image.alt = alt
  image.title = alt
}

function addAuthorToPseudo (source, tag) {
  let author = source.user.name
  let capitalizedAuthor = author.charAt(0).toUpperCase() + author.slice(1)
  tag.innerText = `Uploaded on Unsplash by: ${capitalizedAuthor}`
}

function addHrefToLinkTag (source, tag) {
  tag.href = source.links.html
  tag.target = '_blank'
}

function putImagesInImageClass () {
  const images = document.querySelectorAll('img')
  images.forEach(image => {
    image.classList.add('image')
  })
}

async function showImages () {
  const data = await getImages()
  for (let image of data) {
    const Newimg = document.createElement('img')
    const newLinkTag = document.createElement('a')
    const authorTag = document.createElement('span')
    addAuthorToPseudo(image, authorTag)

    addAltToTag(image, Newimg)
    addHrefToLinkTag(image, newLinkTag)
    imageContainer.appendChild(newLinkTag).appendChild(Newimg).src =
      image.urls.regular
    authorTag.classList.add('author')
    imageContainer.appendChild(authorTag)
  }
  putImagesInImageClass()
}

document.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showImages()
  }
})

document.addEventListener('DOMContentLoaded', () => {
  showImages()
})
