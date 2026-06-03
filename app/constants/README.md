# Constants

Thư mục này chứa các hằng số, enum và các giá trị cấu hình tĩnh được sử dụng trong toàn bộ ứng dụng.

## Cấu trúc đề xuất

```
constants/
├── api.ts          # Các constants liên quan đến API (endpoints, headers, etc.)
├── routes.ts       # Các constants cho routing
├── config.ts       # Các cấu hình chung của ứng dụng
└── enums.ts        # Các enum được sử dụng trong ứng dụng
```

## Quy ước đặt tên

- Sử dụng UPPER_SNAKE_CASE cho constants
- Sử dụng PascalCase cho enums
- Ví dụ: `API_BASE_URL`, `UserRole`

## Best Practices

1. Tổ chức constants theo domain hoặc mục đích sử dụng
2. Sử dụng TypeScript để định nghĩa type cho constants
3. Tránh hardcode các giá trị trong code
4. Export tất cả constants qua file index.ts
5. Thêm comments để giải thích ý nghĩa của các giá trị phức tạp