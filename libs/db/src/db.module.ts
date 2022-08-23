import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DbService } from './db.service';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';

type ClassType = { new (...args: any[]): any };

@Module({})
export class DbModule {
  static forRoot(envKey: string, options = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DB_CONNECT',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const uri = configService.get<string>(envKey, 'MONGO_URI');
          return mongoose.connect(uri, options);
        },
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
  static forFeature(models: ClassType[]): DynamicModule {
    const providers = models.map((model) => {
      return {
        provide: model.name,
        useFactory: () => getModelForClass(model),
      } as Provider;
    });
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
