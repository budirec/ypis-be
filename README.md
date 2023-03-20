# ypis-be
Yummy Products Information System Backend

## Tech Stack
- Docker
- Fastify
- Typescript
- Redis
- Postgres


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
Production->Incubator: Packed Innoculated Beans
Incubator->Production: Tempeh
Production->Sales: Packaged Tempeh
Sales->Customer: Packaged Tempeh
Sales->Customer: Invoice
Customer->Finance: Payment
note over Finance,Customer: Or
Customer->Sales: Payment
Sales->Finance: Payment
```
