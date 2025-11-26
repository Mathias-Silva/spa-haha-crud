/spa-haha-crud/
├── /backend/
│   ├── /config/
│   │   └── db.js (Conexão MongoDB)
│   ├── /models/
│   │   ├── User.js
│   │   └── Massagem.js (Tipo de massagem)
│   ├── /routes/
│   │   ├── auth.js (Login/Cadastro)
│   │   └── admin.js (CRUD Massagem)
│   ├── server.js (Ponto de entrada do Node)
│   └── package.json
└── /frontend/ (Projeto Angular)
    ├── /src/
    │   ├── /app/
    │   │   ├── /auth/
    │   │   │   ├── login/
    │   │   │   └── cadastro/
    │   │   ├── /admin/
    │   │   │   ├── massagem-form/
    │   │   │   └── massagem-list/
    │   │   └── /services/
    │   │       └── admin.service.ts
    └── package.json

    rodar front
    npx ng serve --open