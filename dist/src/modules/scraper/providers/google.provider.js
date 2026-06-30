"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleProvider = void 0;
const common_1 = require("@nestjs/common");
const cheerio = require("cheerio");
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
let GoogleProvider = GoogleProvider_1 = class GoogleProvider {
    logger = new common_1.Logger(GoogleProvider_1.name);
    async scrape(targetUrl) {
        this.logger.log(`[CHẾ ĐỘ TÀNG HÌNH] Bật Trình duyệt ảo để vượt tường lửa BatDongSan.com.vn...`);
        let browser;
        try {
            browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            await page.setViewport({ width: 1280, height: 800 });
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
            });
            const url = targetUrl && targetUrl.startsWith('http') ? targetUrl : `https://batdongsan.com.vn/nha-dat-ban-da-nang`;
            this.logger.log(`Đang xâm nhập URL: ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
            await page
                .waitForSelector('.js__card-full-web', { timeout: 15000 })
                .catch(() => { });
            const html = await page.content();
            const $ = cheerio.load(html);
            const results = [];
            $('.js__card-full-web').each((i, el) => {
                const titleEl = $(el).find('.re__card-title span');
                const linkEl = $(el).find('.js__product-link-for-product-id');
                const priceEl = $(el).find('.re__card-config-price');
                const areaEl = $(el).find('.re__card-config-area');
                const descEl = $(el).find('.re__card-description');
                const locationEl = $(el).find('.re__card-location');
                const title = titleEl.text().trim() || linkEl.attr('title');
                let link = linkEl.attr('href') || '';
                if (link && !link.startsWith('http')) {
                    link = `https://batdongsan.com.vn${link}`;
                }
                const price = priceEl.text().trim();
                const area = areaEl.text().trim();
                const desc = descEl.text().trim();
                const location = locationEl.text().trim().replace(/\n/g, '').trim();
                const rawHtml = $(el).html() || '';
                if (title && link) {
                    results.push({
                        title: title,
                        price: price,
                        area: area,
                        location: location,
                        link: link,
                        content: desc,
                        rawData: {
                            html: rawHtml,
                            extracted_at: new Date().toISOString(),
                            keyword: targetUrl,
                        },
                        source: 'batdongsan.com.vn',
                        scrapedAt: new Date().toISOString(),
                    });
                }
            });
            this.logger.log(`[Bóc Tách Thành Công] Tìm thấy ${results.length} bài đăng. Bắt đầu chui vào từng bài để cào TOÀN BỘ NỘI DUNG (All Content)...`);
            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                try {
                    this.logger.log(`Đang cào chi tiết [${i + 1}/${results.length}]: ${item.link}`);
                    await page.goto(item.link, {
                        waitUntil: 'domcontentloaded',
                        timeout: 30000,
                    });
                    await page
                        .waitForSelector('.re__detail-content', { timeout: 10000 })
                        .catch(() => { });
                    const detailHtml = await page.content();
                    const _$ = cheerio.load(detailHtml);
                    const fullContent = _$('.re__detail-content').text().trim();
                    if (fullContent) {
                        item.content = fullContent;
                        item.rawData.detail_html = detailHtml;
                    }
                    await new Promise((r) => setTimeout(r, 2000));
                }
                catch (detailError) {
                    this.logger.warn(`Không cào được chi tiết bài [${item.link}]: ${detailError.message}`);
                }
            }
            this.logger.log(`[Cào Thành Công] Đã lấy được TOÀN BỘ NỘI DUNG của ${results.length} bài đăng BẤT ĐỘNG SẢN CHÍNH CHỦ!`);
            return results;
        }
        catch (error) {
            this.logger.error(`Lỗi cào dữ liệu BatDongSan: ${error.message}`);
            return [];
        }
        finally {
            if (browser) {
                await browser.close();
            }
        }
    }
};
exports.GoogleProvider = GoogleProvider;
exports.GoogleProvider = GoogleProvider = GoogleProvider_1 = __decorate([
    (0, common_1.Injectable)()
], GoogleProvider);
//# sourceMappingURL=google.provider.js.map