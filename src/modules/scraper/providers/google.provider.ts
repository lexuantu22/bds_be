import { Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

// Khắc phục lỗi TypeScript bằng require để load đúng plugin tàng hình
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

@Injectable()
export class GoogleProvider {
  private readonly logger = new Logger(GoogleProvider.name);

  async scrape(targetUrl: string): Promise<any[]> {
    this.logger.log(
      `[CHẾ ĐỘ TÀNG HÌNH] Bật Trình duyệt ảo để vượt tường lửa BatDongSan.com.vn...`,
    );

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new', // Chạy ẩn không hiện cửa sổ
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Giả lập thiết bị thật để đánh lừa Cloudflare
      await page.setViewport({ width: 1280, height: 800 });
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
      });

      // Lấy chuẩn xác 100% link bạn cung cấp!
      const url = targetUrl && targetUrl.startsWith('http') ? targetUrl : `https://batdongsan.com.vn/nha-dat-ban-da-nang`;
      this.logger.log(`Đang xâm nhập URL: ${url}`);

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // Đợi tối đa 15s để các bài đăng load ra màn hình
      await page
        .waitForSelector('.js__card-full-web', { timeout: 15000 })
        .catch(() => {});

      const html = await page.content();
      const $ = cheerio.load(html);
      const results: any[] = [];

      // Bóc tách cấu trúc HTML chuẩn của BatDongSan.com.vn
      $('.js__card-full-web').each((i, el) => {
        const titleEl = $(el).find('.re__card-title span');
        const linkEl = $(el).find('.js__product-link-for-product-id');
        const priceEl = $(el).find('.re__card-config-price');
        const areaEl = $(el).find('.re__card-config-area');
        const descEl = $(el).find('.re__card-description');
        const locationEl = $(el).find('.re__card-location'); // Lấy vị trí

        const title = titleEl.text().trim() || linkEl.attr('title');
        let link = linkEl.attr('href') || '';
        if (link && !link.startsWith('http')) {
          link = `https://batdongsan.com.vn${link}`;
        }

        const price = priceEl.text().trim();
        const area = areaEl.text().trim();
        const desc = descEl.text().trim();
        const location = locationEl.text().trim().replace(/\n/g, '').trim();

        // Lấy toàn bộ mã HTML thô của cái bài đăng này để lỡ sau này muốn bóc thêm chi tiết
        const rawHtml = $(el).html() || '';

        if (title && link) {
          results.push({
            title: title,
            price: price, // Tách riêng Giá
            area: area, // Tách riêng Diện tích
            location: location, // Lấy luôn địa chỉ khu vực
            link: link,
            content: desc, // Tạm thời lưu mô tả ngắn
            rawData: {
              html: rawHtml,
              extracted_at: new Date().toISOString(),
              keyword: targetUrl,
            }, // Lưu toàn bộ data thô
            source: 'batdongsan.com.vn',
            scrapedAt: new Date().toISOString(),
          });
        }
      });

      this.logger.log(
        `[Bóc Tách Thành Công] Tìm thấy ${results.length} bài đăng. Bắt đầu chui vào từng bài để cào TOÀN BỘ NỘI DUNG (All Content)...`,
      );

      // Bắt đầu chui vào từng link để cào All Content
      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        try {
          this.logger.log(
            `Đang cào chi tiết [${i + 1}/${results.length}]: ${item.link}`,
          );
          await page.goto(item.link, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
          });

          // Chờ nội dung chi tiết hiển thị
          await page
            .waitForSelector('.re__detail-content', { timeout: 10000 })
            .catch(() => {});

          const detailHtml = await page.content();
          const _$ = cheerio.load(detailHtml);

          // Móc toàn bộ nội dung bài đăng
          const fullContent = _$('.re__detail-content').text().trim();

          if (fullContent) {
            item.content = fullContent; // Ghi đè mô tả ngắn bằng toàn bộ nội dung cực dài
            item.rawData.detail_html = detailHtml; // Lưu luôn cả cục HTML của trang chi tiết vào Database
          }

          // Nghỉ ngơi 2 giây trước khi sang bài tiếp theo để tránh Cloudflare block
          await new Promise((r) => setTimeout(r, 2000));
        } catch (detailError: any) {
          this.logger.warn(
            `Không cào được chi tiết bài [${item.link}]: ${detailError.message}`,
          );
        }
      }

      this.logger.log(
        `[Cào Thành Công] Đã lấy được TOÀN BỘ NỘI DUNG của ${results.length} bài đăng BẤT ĐỘNG SẢN CHÍNH CHỦ!`,
      );
      return results;
    } catch (error: any) {
      this.logger.error(`Lỗi cào dữ liệu BatDongSan: ${error.message}`);
      return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
