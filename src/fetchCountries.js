function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => {
            if (!response.ok) return Promise.reject("No result! Please try again.")
            return response.json()
        }).then((array) => {
            const arrayFiltered = array.filter(el => {
                if (el.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                    return el
                }
            })
            return arrayFiltered
        })
}

export default fetchCountries