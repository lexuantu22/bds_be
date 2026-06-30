"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCleanerService = void 0;
const common_1 = require("@nestjs/common");
let DataCleanerService = class DataCleanerService {
    clean(items) {
        return items.map((item) => {
            const cleanPrice = item.price
                ? item.price.replace(/\s+/g, ' ').trim()
                : null;
            const cleanArea = item.area
                ? item.area.replace(/\s+/g, ' ').trim()
                : null;
            const cleanTitle = item.title ? item.title.trim() : null;
            return {
                ...item,
                title: cleanTitle,
                price: cleanPrice,
                area: cleanArea,
            };
        });
    }
};
exports.DataCleanerService = DataCleanerService;
exports.DataCleanerService = DataCleanerService = __decorate([
    (0, common_1.Injectable)()
], DataCleanerService);
//# sourceMappingURL=data-cleaner.service.js.map