// Query + hang so dung chung cho ca server (page.tsx) va client (ProductsClient.tsx).
// QUAN TRONG: file nay KHONG duoc co 'use client' — moi export cua module client
// khi import vao server component se thanh client reference (khong con la string),
// khien query gui len WP thanh rac va tra ve null.

export const PER_PAGE = 24;

// Lay danh muc con cua "san-pham" truc tiep tu WordPress
export const PRODUCT_CATS_QUERY = `
  query GetProductCats {
    category(id: "san-pham", idType: SLUG) {
      children(first: 50) {
        nodes { name slug count }
      }
    }
  }
`;

export const GALLERY_QUERY = `
  query GetGallery($first: Int!, $categorySlug: String!, $after: String) {
    posts(first: $first, after: $after, where: {categoryName: $categorySlug, orderby: {field: DATE, order: DESC}}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id title slug
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

export interface ProductsInitialData {
  cat: string;
  products: any[];
  hasNextPage: boolean;
  endCursor: string | null;
  categories: any[];
  pageData: any;
}
