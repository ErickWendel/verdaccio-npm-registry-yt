import Abacate from '@erickwendel/abacate'

const abacate = new Abacate()
const result = await abacate.makeRequest({
    url: 'https://rickandmortyapi.com/api/character/1'
})

console.log('result', result)