import Abacate from '@erickwendel/abacate'


const URL = 'https://rickandmortyapi.com/api/character/1'


const abacate = new Abacate()
const result = await abacate.makeRequest({
    url: URL
})

console.log(result)

process.exit(0)