const normalizeShopifyCart = shopifyCart => {
	const cartInfo = {
		note: shopifyCart.note
	};
	let cartItemsObj = {};
	shopifyCart.items.forEach(itemObj => {
		cartItemsObj[itemObj.variant_id] = {
			id: itemObj.variant_id,
			title: itemObj.product_title,
			variant: itemObj.variant_title,
			handle: itemObj.handle,
			vendor: itemObj.vendor,
      options_with_values: itemObj.options_with_values,
			image: itemObj.image,
			price: itemObj.price,
			quantity: itemObj.quantity
		};
	});
	return {
		...cartInfo,
		items: cartItemsObj
	};
};

const normalizeShopifyProduct = shopifyProduct => {
	return {
		[shopifyProduct.variant_id]: {
			id: shopifyProduct.variant_id,
			image: shopifyProduct.image,
			title: shopifyProduct.product_title,
			variant: shopifyProduct.variant_title,
			price: shopifyProduct.price,
			handle: shopifyProduct.handle,
			vendor: shopifyProduct.vendor,
			quantity: shopifyProduct.quantity,
      options_with_values: shopifyProduct.options_with_values,
		}
	};
};

export { normalizeShopifyCart, normalizeShopifyProduct };
