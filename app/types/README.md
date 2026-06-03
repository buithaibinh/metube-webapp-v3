# Types

Thư mục này chứa các TypeScript type definitions được sử dụng trong toàn bộ ứng dụng.

## Cấu trúc đề xuất

```
types/
├── api/            # API related types
├── models/         # Data model types
├── store/          # Store related types
└── index.ts        # Export tất cả types
```

## Quy ước đặt tên

- Sử dụng PascalCase cho type names
- Thêm hậu tố phù hợp (Interface, Type, Enum)
- Ví dụ: `UserInterface`, `ApiResponseType`

## Best Practices

1. Tổ chức types theo domain
2. Sử dụng interfaces cho objects
3. Sử dụng type aliases cho unions và intersections
4. Tái sử dụng types khi có thể
5. Sử dụng generics khi cần
6. Export tất cả types qua file index.ts
7. Thêm JSDoc comments cho các types phức tạp