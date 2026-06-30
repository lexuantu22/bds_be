import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class FacebookProvider {
  private readonly logger = new Logger(FacebookProvider.name);

  async scrape(keyword: string): Promise<any[]> {
    this.logger.log(`Starting scraping Facebook for keyword: ${keyword}`);

    // Facebook cấm bot rất nặng, cách tốt nhất là dùng thư viện puppeteer
    // kết hợp với puppeteer-extra-plugin-stealth

    const browser = await puppeteer.launch({
      headless: true, // Chạy trình duyệt ẩn
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });

      // Giả lập user agent
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      );

      // Đi tới trang search của Facebook
      const searchUrl = `https://www.facebook.com/search/posts/?q=${encodeURIComponent(keyword)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // TODO: Ở đây cần login Facebook thông qua việc inject Cookie.
      // Nếu không login, FB sẽ chặn và bắt đăng nhập.
      // await page.setCookie(...cookies);

      this.logger.log('Page loaded, waiting for content...');

      // Chờ một khoảng thời gian hoặc chờ selector xuất hiện
      // await page.waitForSelector('.x1yztbdb', { timeout: 5000 }).catch(() => null);

      // Do việc cào FB phức tạp và yêu cầu login, code dưới đây chỉ mang tính chất demo cấu trúc
      const items = await page.evaluate(() => {
        const posts: any[] = [];
        // Ví dụ: Query các thẻ chứa bài đăng
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
    } catch (error) {
      this.logger.error(`Error scraping Facebook: ${error.message}`);
      return [];
    } finally {
      await browser.close();
    }
  }
}
