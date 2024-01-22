import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/server/app.module'
import * as http from 'http'
import { NextApiHandler } from 'next'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from '@/server/error/exception.filter'

export module Main {
  let app: INestApplication

  export async function getApp() {
    if (!app) {
      app = await NestFactory.create(AppModule, { bodyParser: false })
      app.setGlobalPrefix('api/v1')
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
        }),
      )
      app.useGlobalFilters(new GlobalExceptionFilter())

      const config = new DocumentBuilder()
        .setTitle('wagglewaggle API')
        .setDescription('와글와글 API 문서입니다')
        .setVersion('1.0')
        .build()
      const document = SwaggerModule.createDocument(app, config)
      SwaggerModule.setup('api/v1/api-docs', app, document)

      await app.init()
    }

    return app
  }

  export async function getListener() {
    const app = await getApp()
    const server: http.Server = app.getHttpServer()
    const [listener] = server.listeners('request') as NextApiHandler[]

    return listener
  }
}
