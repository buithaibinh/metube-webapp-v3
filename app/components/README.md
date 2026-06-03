# Components

Thư mục này chứa các Vue components có thể tái sử dụng trong toàn bộ ứng dụng.

## Cấu trúc đề xuất

```
components/
├── common/         # Các components dùng chung (Button, Input, Card, etc.)
├── forms/          # Các components liên quan đến form
├── layout/         # Các components layout (Header, Footer, Sidebar, etc.)
└── features/       # Các components đặc thù cho từng tính năng
```

## Quy ước đặt tên

- Sử dụng PascalCase cho tên component
- Đặt tên file trùng với tên component
- Ví dụ: `Button.vue`, `UserProfile.vue`

## Best Practices

1. Mỗi component nên có một mục đích rõ ràng
2. Tách biệt logic và UI
3. Sử dụng TypeScript để định nghĩa props và emits
4. Viết documentation cho component phức tạp
5. Tối ưu performance bằng cách sử dụng `v-memo` khi cần thiết