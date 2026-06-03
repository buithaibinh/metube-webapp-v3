# Plugins

Thư mục này chứa các Nuxt plugins để mở rộng chức năng của ứng dụng.

## Cấu trúc đề xuất

```
plugins/
├── axios.ts        # Plugin cho Axios
├── vuetify.ts      # Plugin cho Vuetify
└── i18n.ts         # Plugin cho internationalization
```

## Quy ước đặt tên

- Sử dụng kebab-case cho tên file
- Đặt tên theo thư viện hoặc chức năng
- Ví dụ: `axios.ts`, `vuetify.ts`

## Best Practices

1. Mỗi plugin nên có một trách nhiệm duy nhất
2. Sử dụng TypeScript để định nghĩa types
3. Xử lý error handling một cách phù hợp
4. Tối ưu performance bằng cách lazy load khi cần
5. Viết documentation cho các plugins phức tạp