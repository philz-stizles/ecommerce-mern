import { SubCategory } from '../../types';

export { default as BrandFilter } from './BrandFilter/BrandFilter';
export { default as ColorFilter } from './ColorFilter/ColorFilter';
export { default as RatingFilter } from './RatingFilter/RatingFilter';
export { default as ShippingFilter } from './ShippingFilter/ShippingFilter';
export { default as SubCategoryFilter } from './SubCategoryFilter/SubCategoryFilter';

export type FilterProps = {
  resetFilters: () => void;
  filterProducts: ({
    shipping,
  }: {
    shipping?: string;
    stars?: number;
    color?: string;
    brand?: string;
    sub?: SubCategory;
  }) => void;
};

export type ResetHandle = {
  reset: () => void;
};