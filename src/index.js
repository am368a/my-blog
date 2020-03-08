import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { register } from "./routes";
const APP_BUILD_DIR='build';
const app = express();
app.use(express.static(path.join(__dirname, `/${APP_BUILD_DIR}`)));
app.use( bodyParser.json() );
const PORT = 8000;

app.use( ( err, req, res, next ) => {
    res.status( 500 ).send( err );
    next();
} );

register( app );
app.get( "*", ( req, res ) => {
    res.sendFile( path.join( `${__dirname}/${APP_BUILD_DIR}/index.html` ) );
} );
app.listen( PORT, () => console.log( `Server listening at ${PORT}` ) );
