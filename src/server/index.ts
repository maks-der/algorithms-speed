import express, { Request, Response } from 'express';
import { join } from 'path';

export class Server {
    private port = 3000;

    public start(): void {
        const app = express();

        app.get('/data', (req: Request, res: Response) => {
            res.sendFile(join(__dirname, './temp/results.json'));
        });

        app.use('/', express.static(join(__dirname, './public')));

        app.listen(this.port, () => {
            console.log(`Server started.\nResults here: http://localhost:${this.port}`);
        });
    }
}