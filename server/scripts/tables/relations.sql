
/* ********************* CASH-BACK ********************* */
ALTER TABLE cashback_customer
ADD CONSTRAINT fk_cashback_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

ALTER TABLE cash_back_transaction
ADD CONSTRAINT fk_cash_back_transaction_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

ALTER TABLE cash_back_transaction
ADD CONSTRAINT fk_cash_back_transaction_reason
FOREIGN KEY (cash_back_reason_id) REFERENCES `cash_back_reason`(id)
ON DELETE CASCADE;

ALTER TABLE cash_back_transaction
ADD CONSTRAINT fk_cash_back_transaction_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE SET NULL;

ALTER TABLE cash_back_transaction
ADD CONSTRAINT fk_cash_back_transaction_review
FOREIGN KEY (review_id) REFERENCES `review`(id)
ON DELETE SET NULL;

/* ********************* PROMOTION ********************* */
ALTER TABLE `promotion_product`
ADD CONSTRAINT fk_promotion_product_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

ALTER TABLE `promotion_product`
ADD CONSTRAINT fk_promotion_product_promotion
FOREIGN KEY (promotion_id) REFERENCES `promotion`(id)
ON DELETE CASCADE;

ALTER TABLE `promotion`
ADD CONSTRAINT fk_promotion_promotion_type
FOREIGN KEY (promotion_type_id) REFERENCES `promotion_type`(id)
ON DELETE CASCADE;

/* ********************* CUSTOMER ********************* */
ALTER TABLE cart
ADD CONSTRAINT fk_customer_id
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE SET NULL;

ALTER TABLE cart_item
ADD CONSTRAINT fk_product_cart
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE SET NULL;

ALTER TABLE cart_item
ADD CONSTRAINT fk_cart_item
FOREIGN KEY (cart_id) REFERENCES `cart`(id)
ON DELETE SET NULL;

ALTER TABLE wishlist
ADD CONSTRAINT fk_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE SET NULL;

ALTER TABLE wishlist_item
ADD CONSTRAINT fk_product_wishlist
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE SET NULL;

ALTER TABLE wishlist_item
ADD CONSTRAINT fk_wishlist_item
FOREIGN KEY (wishlist_id) REFERENCES `wishlist`(id)
ON DELETE SET NULL;

ALTER TABLE customer_address
ADD  CONSTRAINT fk_customer_id_address
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE SET NULL;

/* ********************* GIFT-CARD ********************* */
ALTER TABLE gift_card
ADD CONSTRAINT fk_gift_card_first_holder
FOREIGN KEY (first_holder_id) REFERENCES `customer`(id)
ON DELETE SET NULL;

ALTER TABLE gift_card
ADD CONSTRAINT fk_gift_card_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE SET NULL;

ALTER TABLE cart_gift_card
ADD CONSTRAINT fk_cart
FOREIGN KEY (cart_id) REFERENCES `cart`(id)
ON DELETE SET NULL;

ALTER TABLE wishlist_gift_card
ADD CONSTRAINT fk_wishlist
FOREIGN KEY (wishlist_id) REFERENCES `wishlist`(id)
ON DELETE SET NULL;

ALTER TABLE gift_card_usage
ADD CONSTRAINT fk_gift_card_usage_gift_card
FOREIGN KEY (gift_card_id) REFERENCES `gift_card`(id)
ON DELETE CASCADE;

ALTER TABLE gift_card_usage
ADD CONSTRAINT fk_gift_card_usage_customer
FOREIGN KEY (used_by_customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

/* ********************* COLLECTION ********************* */
ALTER TABLE collection
ADD CONSTRAINT unique_collection_label UNIQUE (label);

/* ********************* CATEGORY ********************* */
ALTER TABLE category
ADD CONSTRAINT fk_category_parent_collection
FOREIGN KEY (parent_collection_id) REFERENCES `collection`(id)
ON DELETE CASCADE;

ALTER TABLE category
ADD CONSTRAINT unique_category_label UNIQUE (label);

/* ********************* TAG ********************* */
ALTER TABLE tag
ADD CONSTRAINT unique_tag_label UNIQUE (label);

/* ********************* ORDER ********************* */
ALTER TABLE `order`
ADD CONSTRAINT fk_order_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_order_status
FOREIGN KEY (order_status_id) REFERENCES `order_status`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_payment_status
FOREIGN KEY (payment_status_id) REFERENCES `payment_status`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_payment_method
FOREIGN KEY (payment_method_id) REFERENCES `payment_method`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_gift_card
FOREIGN KEY (order_gift_card_id) REFERENCES `order_gift_card`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_code_promo
FOREIGN KEY (code_promo_id) REFERENCES `code_promo`(id)
ON DELETE SET NULL;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_shipping_method
FOREIGN KEY (shipping_method_id) REFERENCES `shipping_method`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_address_shipping
FOREIGN KEY (order_address_shipping_id) REFERENCES `order_address_shipping`(id)
ON DELETE CASCADE;

ALTER TABLE `order`
ADD CONSTRAINT fk_order_address_billing
FOREIGN KEY (order_address_billing_id) REFERENCES `order_address_billing`(id)
ON DELETE CASCADE;

ALTER TABLE `order_message`
ADD CONSTRAINT fk_order_message_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE CASCADE;

ALTER TABLE `order_tracking`
ADD CONSTRAINT fk_order_tracking_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE CASCADE;

ALTER TABLE `order_gift_card`
ADD CONSTRAINT fk_order_gift_card_usage
FOREIGN KEY (gift_card_usage_id) REFERENCES `gift_card_usage`(id)
ON DELETE CASCADE;

/* ********************* ORDER-ITEM ********************* */
ALTER TABLE `order_item`
ADD CONSTRAINT fk_order_item_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

ALTER TABLE `order_item`
ADD CONSTRAINT fk_order_item_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE CASCADE;

ALTER TABLE `order_item`
ADD CONSTRAINT fk_order_item_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

/* ********************* PRODUCT ********************* */
ALTER TABLE `product_variant`
ADD CONSTRAINT fk_product_id
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE SET NULL;

ALTER TABLE `product_variant`
ADD CONSTRAINT fk_parent_product_id
FOREIGN KEY (parent_product_id) REFERENCES `product`(id)
ON DELETE SET NULL;

ALTER TABLE `product_image`
ADD CONSTRAINT fk_product_image_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

ALTER TABLE `product_attribute`
ADD CONSTRAINT fk_product_attribute_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

ALTER TABLE `product_attribute`
ADD CONSTRAINT fk_product_attribute_attribute_value
FOREIGN KEY (attribute_value_id) REFERENCES `attribute_value`(id)
ON DELETE CASCADE;

ALTER TABLE `attribute_value`
ADD CONSTRAINT fk_attribute_value_attribute
FOREIGN KEY (attribute_id) REFERENCES `attribute`(id)
ON DELETE CASCADE;

ALTER TABLE `product_category`
ADD CONSTRAINT fk_product_category_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

ALTER TABLE `product_category`
ADD CONSTRAINT fk_product_category_category
FOREIGN KEY (category_id) REFERENCES `category`(id)
ON DELETE CASCADE;

ALTER TABLE `product_tag`
ADD CONSTRAINT fk_product_tag_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

ALTER TABLE `product_tag`
ADD CONSTRAINT fk_product_tag_tag
FOREIGN KEY (tag_id) REFERENCES `tag`(id)
ON DELETE CASCADE;

/* ********************* REVIEW ********************* */
ALTER TABLE `review`
ADD CONSTRAINT fk_review_customer
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE CASCADE;

ALTER TABLE `review`
ADD CONSTRAINT fk_review_order
FOREIGN KEY (order_id) REFERENCES `order`(id)
ON DELETE CASCADE;

ALTER TABLE `review`
ADD CONSTRAINT fk_review_product
FOREIGN KEY (product_id) REFERENCES `product`(id)
ON DELETE CASCADE;

/* ********************* DELIVERY ********************* */
ALTER TABLE `shipping_method`
ADD CONSTRAINT fk_shipping_method_settings
FOREIGN KEY (shipping_method_settings_id) REFERENCES `shipping_method_settings`(id)
ON DELETE CASCADE;

ALTER TABLE `shipping_method_settings`
ADD CONSTRAINT fk_shipping_method_settings_tarifs
FOREIGN KEY (shipping_method_tarifs_id) REFERENCES `shipping_method_tarifs`(id)
ON DELETE CASCADE;


/* ********************* NOTES-ADMIN ********************* */
ALTER TABLE notes_admin
ADD CONSTRAINT fk_notes_admin_customer_id
FOREIGN KEY (customer_id) REFERENCES `customer`(id)
ON DELETE SET NULL;
