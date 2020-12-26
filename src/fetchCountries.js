function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => {
            if(!response.ok) return Promise.reject("No result! Please try again.")
            return response.json()
        })
}
export default fetchCountries