# Utils

Thư mục này chứa các utility functions và helper methods được sử dụng trong toàn bộ ứng dụng.

## Cấu trúc đề xuất

```
utils/
├── format/         # Formatting utilities
├── validation/     # Validation helpers
├── date/           # Date manipulation
└── index.ts        # Export tất cả utilities
```

## Quy ước đặt tên

- Sử dụng camelCase cho function names
- Đặt tên theo chức năng
- Ví dụ: `formatCurrency`, `validateEmail`

## Best Practices

1. Tổ chức utilities theo chức năng
2. Sử dụng TypeScript để định nghĩa input/output types
3. Viết pure functions khi có thể
4. Thêm unit tests cho các utilities
5. Xử lý edge cases
6. Thêm JSDoc comments
7. Tránh side effects
8. Tối ưu performance cho các functions được gọi thường xuyên