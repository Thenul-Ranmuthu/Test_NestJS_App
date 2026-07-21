import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from 'src/app.module';

const server = express();
let isBootstraped = false

async function bootstrap(){
    if(!isBootstraped){
        const app =await NestFactory.create(AppModule, new ExpressAdapter(server))
    app.enableCors()
    await app.init()
    }
    return server
}

bootstrap()

export default async (req: any, res: any) =>{
    const server = await bootstrap()
    server(req,res)
}