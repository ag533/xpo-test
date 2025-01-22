export interface Exhibitor {
    ExhibitorID: string;
    company: string;
    name: string;
    position: string;
    profile_picture: string;
  }
  
  export interface Brand {
    BrandID: string;
    brand_name: string;
    description: string;
    exhibitor: Exhibitor;
    exhibitor_id: string;
    hall: string;
    image_url: string;
    location: string;
    product_tag: string;
    stand_number: string;
  }