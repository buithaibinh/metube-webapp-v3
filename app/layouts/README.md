# Layouts

Thư mục này chứa các layout templates định nghĩa cấu trúc chung cho các trang trong ứng dụng.

## Cấu trúc đề xuất

```
layouts/
├── default.vue     # Layout mặc định
├── auth.vue        # Layout cho các trang authentication
└── dashboard.vue   # Layout cho dashboard
```

## Quy ước đặt tên

- Sử dụng kebab-case cho tên file
- Đặt tên theo mục đích sử dụng
- Ví dụ: `default.vue`, `auth.vue`

## Best Practices

1. Mỗi layout nên có một mục đích rõ ràng
2. Sử dụng `<slot>` để render nội dung động
3. Tách biệt các components layout vào thư mục `components/layout`
4. Xử lý responsive design trong layout
5. Tối ưu performance bằng cách lazy load các components không cần thiết