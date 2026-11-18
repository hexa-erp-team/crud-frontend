# React + Spring Boot + H2 CRUD

Simple Product CRUD.

- **backend/** – Java 17, Spring Boot 3.3, Spring Data JPA, H2 (in-memory)
- **frontend/** – React 18 + Vite

## Run the backend

```bash
cd backend
mvn spring-boot:run
```

(or open `backend` in IntelliJ as a Maven project and run `CrudApplication`)

- API: http://localhost:8080/api/products
- H2 console: http://localhost:8080/h2-console
  JDBC URL `jdbc:h2:mem:cruddb`, user `sa`, empty password

## Run the frontend

Requires Node 18+.

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## REST endpoints

| Method | URL                    | Description     |
|--------|------------------------|-----------------|
| GET    | /api/products          | List all        |
| GET    | /api/products/{id}     | Get one         |
| POST   | /api/products          | Create          |
| PUT    | /api/products/{id}     | Update          |
| DELETE | /api/products/{id}     | Delete          |

Sample body:

```json
{ "name": "Keyboard", "description": "Mechanical", "price": 49.99, "quantity": 10 }
```

Note: H2 is in-memory, so data resets on each backend restart.
