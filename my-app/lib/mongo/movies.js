// import clientPromise from "." // Adjust path if needed
// 
// let client
// let db
// let movies
// 
// async function init() {
//     if (db) return
//     try {
//         client = await clientPromise
//         db = client.db()
//         movies = db.collection('movies') // Corrected assignment
//     } catch (error) {
//         throw new Error('Failed to establish connection to database')
//     }
// }
// 
// ;(async () => {
//     await init()
// })()
// 
// ////////////////
// //// MOVIES ////
// ////////////////
// 
// export async function getMovies() {
//     try {
//         if (!movies) await init() // Ensure `movies` is initialized
//         const result = await movies
//             .find({})
//             .limit(20)
//             .toArray()
//         const transformedResult = result.map(user => ({ ...user, _id: user._id.toString() })) // Map after `toArray`
// 
//         return { movies: transformedResult }
//     } catch (error) {
//         return { error: 'Failed to fetch movies!' }
//     }
// }


import clientPromise from "." // Adjust path if needed

let client
let db
let movies

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db()
        movies = db.collection('movies') // Corrected assignment
    } catch (error) {
        throw new Error('Failed to establish connection to database')
    }
}

;(async () => {
    await init()
})()

////////////////
//// MOVIES ////
////////////////

export async function getMovies() {
    try {
        if (!movies) await init() // Ensure `movies` is initialized
        const result = await movies
            .find({})
            .limit(20)
            .toArray()
        const transformedResult = result.map(user => ({ ...user, _id: user._id.toString() })) // Map after `toArray`

        return { movies: transformedResult }
    } catch (error) {
        return { error: 'Failed to fetch movies!' }
    }
}
