-- Backfill reserved stock from the inventory ledger so product availability is accurate.
with totals as (
  select
    product.id,
    greatest(
      coalesce(sum(
        case movement.movement_type
          when 'reserved' then abs(movement.quantity)
          when 'released' then -abs(movement.quantity)
          else 0
        end
      ), 0),
      0
    )::integer as reserved_stock
  from public.products as product
  left join public.inventory_movements as movement on movement.product_id = product.id
  group by product.id
)
update public.products as product
set
  reserved_stock = coalesce(totals.reserved_stock, 0),
  stock_status = case
    when coalesce(product.stock_quantity, product.stock, 0) - coalesce(totals.reserved_stock, 0) <= 0 then 'out_of_stock'
    else 'in_stock'
  end
from totals
where product.id = totals.id;
