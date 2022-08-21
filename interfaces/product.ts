export interface ICollection {
	collection: IProducts;
}
export interface IProducts {
	products: {
		nodes: IProduct[];
	};
}

export interface INodeProduct {
	nodes: IProduct[];
}

export interface IProductHandle {
	product: IProduct;
}

export interface IProduct {
	title: string;
	handle: string;
	id: string;
	priceRange: PriceRange;
	description: string;
	featuredImage: FeaturedImage;
	availableForSale: boolean;
	images: INodeImage;
	sellingPlanGroups: SellingPlanGroups;
	seo: SEO;
	variants: Variants;
}

export interface INodeImage {
	nodes: FeaturedImage[];
}

export interface FeaturedImage {
	url: string;
	altText: string;
}

export interface PriceRange {
	maxVariantPrice: MaxVariantPrice;
}

export interface MaxVariantPrice {
	amount: string;
}

export interface SellingPlanGroups {
	nodes: SellingPlanGroupsNode[];
}

export interface SellingPlanGroupsNode {
	appName: string;
	name: string;
	sellingPlans: SellingPlans;
	options: Option[];
}

export interface Option {
	name: string;
	values: string[];
}

export interface SellingPlans {
	nodes: SellingPlanElement[];
}

export interface SellingPlanElement {
	name: string;
	id: string;
	description?: string | null;
}

export interface SEO {
	description: string;
	title: string;
}

export interface Variants {
	nodes: VariantsNode[];
}

export interface VariantsNode {
	id: string;
	sellingPlanAllocations: SellingPlanAllocations;
	priceV2: MaxVariantPrice;
	title: string;
	availableForSale: boolean;
	quantityAvailable: number;
}

export interface SellingPlanAllocations {
	nodes: SellingPlanAllocationsNode[];
}

export interface SellingPlanAllocationsNode {
	checkoutChargeAmount: MaxVariantPrice;
	sellingPlan: SellingPlanElement;
	remainingBalanceChargeAmount: MaxVariantPrice;
	priceAdjustments: PriceAdjustment[];
}

export interface PriceAdjustment {
	compareAtPrice: MaxVariantPrice;
	perDeliveryPrice: MaxVariantPrice;
	price: MaxVariantPrice;
	unitPrice: number | null;
}
