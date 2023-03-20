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
