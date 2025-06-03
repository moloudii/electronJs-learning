const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const newFeed = {
        url: e.target[0].value,
        title: e.target[1].value,
    }

    const feeds = JSON.parse(localStorage.getItem('rssFeedUrls')) ?? []
    feeds.push(newFeed)
    localStorage.setItem('rssFeedUrls', JSON.stringify(feeds))
})