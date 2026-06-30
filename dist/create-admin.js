"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const auth_service_1 = require("./src/modules/auth/services/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    const user = await authService.createAdmin('admin', 'password');
    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: password');
    await app.close();
}
bootstrap();
//# sourceMappingURL=create-admin.js.map