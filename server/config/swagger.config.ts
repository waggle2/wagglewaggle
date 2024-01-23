import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('wagglewaggle API')
    .setDescription('와글와글 API 문서입니다')
    .setVersion('1.0')
    .build();
