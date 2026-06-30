import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AuthService } from './src/modules/auth/services/auth.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  
  const user = await authService.createAdmin('admin', 'password');
  console.log('Admin user created successfully!');
  console.log('Username: admin');
  console.log('Password: password');
  
  await app.close();
}
bootstrap();
