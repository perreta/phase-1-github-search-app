document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('#search')
    const searchForm = document.querySelector('#github-form')

    searchForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        let input = searchBar.value
        console.log(searchBar.value)

        fetch(`https://api.github.com/search/users?q=${input}`)
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('user-list').innerHTML = ''
            document.getElementById('repos-list').innerHTML = ''
            
            data.items.forEach(element => {
                console.log(element)
                let liDiv = document.createElement('div')
                let imgDiv = document.createElement('div')
                let a = document.createElement('a')
                let li = document.createElement('li')
                let img = document.createElement('img')
                
                li.textContent = `User: ${element.login}`
                img.src = element.avatar_url
                a.href = element.html_url
                a.textContent = element.html_url

                document.getElementById('user-list').append(liDiv)
                liDiv.append(li, a)
                li.append(imgDiv)
                imgDiv.append(img)

                liDiv.addEventListener('click', () => {
                     fetch(`https://api.github.com/users/${element.login}/repos`)
                     .then(resp => resp.json())
                     .then(data => {
                         console.log(data)
                         data.forEach(element => {
                            let aRepo = document.createElement('a')
                            let liRepo = document.createElement('li')

                            aRepo.href = `${element.url}`
                            aRepo.textContent = `${element.url}`
                            
                            document.getElementById('repos-list').append(liRepo)
                            liRepo.append(aRepo)
                         })                        
                     })
            })
        })
    })})
});