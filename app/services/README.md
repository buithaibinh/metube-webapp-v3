# Services

Thư mục này chứa các service classes/functions để xử lý logic gọi API và tương tác với backend.

## Cấu trúc đề xuất

```
services/
├── api/            # Base API service và interceptors
├── auth/           # Authentication services
├── user/           # User related services
└── index.ts        # Export tất cả services
```

## Quy ước đặt tên

- Sử dụng PascalCase cho service classes
- Sử dụng camelCase cho service functions
- Ví dụ: `AuthService`, `getUserProfile`

## Best Practices

1. Tổ chức services theo domain
2. Sử dụng TypeScript để định nghĩa request/response types
3. Xử lý error handling một cách nhất quán
4. Tách biệt business logic và API calls
5. Sử dụng dependency injection khi cần
6. Viết unit tests cho các services