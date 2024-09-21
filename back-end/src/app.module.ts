import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', //127.0.0.1
      port: 3306, //3306
      username: 'root',
      password: 'ward123',
      database: 'mydb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GeolocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
