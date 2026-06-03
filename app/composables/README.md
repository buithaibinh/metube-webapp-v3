# Composables

Thư mục này chứa các composable functions (hooks) để tái sử dụng logic trong ứng dụng.

## Cấu trúc đề xuất

```
composables/
├── api/            # Các composables liên quan đến API calls
├── auth/           # Các composables xử lý authentication
├── form/           # Các composables xử lý form logic
└── ui/             # Các composables xử lý UI logic
```

## Quy ước đặt tên

- Bắt đầu với prefix `use`
- Sử dụng camelCase
- Ví dụ: `useAuth.ts`, `useFormValidation.ts`

## Best Practices

1. Mỗi composable nên có một trách nhiệm duy nhất
2. Sử dụng TypeScript để định nghĩa rõ ràng input/output
3. Xử lý error handling một cách phù hợp
4. Tối ưu performance bằng cách sử dụng `computed` và `watch` khi cần
5. Viết documentation cho các composables phức tạp