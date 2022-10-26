import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import FilmRoute from './routes/FilmRoutes.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'https://filmaxx.vercel.app'
}));
app.use(express.static('public'));
app.use(fileUpload());
app.use(FilmRoute);

app.listen(process.env.PORT || 7433, () => console.log('Server is Running'));
