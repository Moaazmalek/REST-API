import mongoose from 'mongoose'
import app from './app'
import config from './app/config'



async function main() {
    await mongoose.connect(config.db_url as string);

    app.listen(config.port,() => {
        console.log(`Server running on port: ${config.port}`)
    })
    
}
main()
.then(() => {
    console.log("Mongodb is connected")
})
.catch(err => console.log(err))
