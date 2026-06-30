import { Injectable } from '@nestjs/common';

@Injectable()
export class DataCleanerService {
  clean(items: any[]): any[] {
    return items.map((item) => {
      // Chuẩn hóa loại bỏ khoảng trắng thừa
      const cleanPrice = item.price
        ? item.price.replace(/\s+/g, ' ').trim()
        : null;
      const cleanArea = item.area
        ? item.area.replace(/\s+/g, ' ').trim()
        : null;
      const cleanTitle = item.title ? item.title.trim() : null;

      // TODO: Có thể bóc tách giá tiền từ "2 tỷ 500 triệu" thành con số 2500000000 ở đây

      return {
        ...item,
        title: cleanTitle,
        price: cleanPrice,
        area: cleanArea,
      };
    });
  }
}
