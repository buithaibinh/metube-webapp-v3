# Stores

Thư mục này chứa các Pinia stores để quản lý state của ứng dụng.

## Cấu trúc đề xuất

```
stores/
├── auth.ts         # Authentication store
├── user.ts         # User store
└── index.ts        # Export tất cả stores
```

## Quy ước đặt tên

- Sử dụng camelCase cho tên file
- Sử dụng PascalCase cho store names
- Ví dụ: `useAuthStore`, `useUserStore`

## Best Practices

1. Tổ chức stores theo domain
2. Sử dụng TypeScript để định nghĩa state types
3. Tách biệt state, getters, actions
4. Sử dụng composition API style
5. Tránh lưu trữ dữ liệu có thể tính toán được
6. Xử lý error handling trong actions
7. Viết unit tests cho các stores