"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FacebookProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookProvider = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
let FacebookProvider = FacebookProvider_1 = class FacebookProvider {
    logger = new common_1.Logger(FacebookProvider_1.name);
    async scrape(keyword) {
        this.logger.log(`Starting scraping Facebook for keyword: ${keyword}`);
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        try {
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
            const searchUrl = `https://www.facebook.com/search/posts/?q=${encodeURIComponent(keyword)}`;
            await page.goto(searchUrl, { waitUntil: 'networkidle2' });
            this.logger.log('Page loaded, waiting for content...');
            const items = await page.evaluate(() => {
                const posts = [];
                document.querySelectorAll('div[role="article"]').forEach((postEl) => {
                    const text = postEl.textContent || '';
                    if (text.length > 50) {
                        posts.push({
                            content: text,
                            source: 'facebook',
                            scrapedAt: new Date().toISOString(),
                        });
                    }
                });
                return posts;
            });
            this.logger.log(`Scraped ${items.length} items from Facebook`);
            return items;
        }
        catch (error) {
            this.logger.error(`Error scraping Facebook: ${error.message}`);
            return [];
        }
        finally {
            await browser.close();
        }
    }
};
exports.FacebookProvider = FacebookProvider;
exports.FacebookProvider = FacebookProvider = FacebookProvider_1 = __decorate([
    (0, common_1.Injectable)()
], FacebookProvider);
//# sourceMappingURL=facebook.provider.js.map