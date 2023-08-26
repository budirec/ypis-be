# ypis-be
Yummy Products Information System Backend

## Tech Stack
- Docker
- Fastify
- Typescript
- Redis
- Postgres


## Local setup:
1. Install VS Code.
2. Install Vs Code extensions `ESLint` and `Prettier ESLint`
3. Replace VS Code settings.json file contents with following:
    ```
    {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript","typescript"]
    }
    ```
4. cd to ypis-be project src directory and run `npm install`
5. Inside ypis-be root directory run `docker compose up --build`
6. Connect to web container running `docker exec -it yp-web sh` command and run `npm run up` 


## Sequence diagram
### https://sequencediagram.org/
```
title Tempeh Production


participant Customer
participant Sales
participant Production
participant Inventory
participant Incubator
participant Finance

Customer->Sales: PO
Sales->Production: OrderDoc
Production->Inventory: RMR
Inventory->Production: Dry Beans
Production-->Production: Soaking
Production-->Production: Cleaning
Production-->Production: Cooking
Production-->Production: Drying
Production-->Production: Innoculating
Production-->Production: Packaging
Production->Incubator: Packed Innoculated Beans
Incubator-->Incubator: Flip
Incubator->Production: Tempeh
Production->Sales: Packaged Tempeh
Sales->Customer: Packaged Tempeh
Sales->Customer: Invoice
alt Payments
Customer->Finance: Payment
Customer->Sales: Payment
Sales->Finance: Payment
end

```
