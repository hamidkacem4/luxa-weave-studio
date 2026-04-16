
import productMenViscose from "@/assets/product-men-viscose.jpg";
import productMenSilk from "@/assets/product-men-silk.jpg";
import SH09 from "@/assets/SH09.jpg";
import menshirt2 from "@/assets/menShirt2.jpg";
import productMenCotton from "@/assets/product-men-cotton.jpg";
import productWomenViscose from "@/assets/product-women-viscose.jpg";
import productWomenSilk from "@/assets/product-women-silk.jpg";
import productWomenCotton from "@/assets/product-women-cotton.jpg";

import womenCoats from "@/assets/womenCoats-1.webp";
import womenCoats2 from "@/assets/womenCoats2.jpg";

import shirt1 from "@/assets/shirt1.jpg";
import shirt2 from "@/assets/shirt2.jpg";
import shirt3 from "@/assets/shirt3.jpg";
import shirt4 from "@/assets/shirt4.jpg";

//women shirts and tops images
import tshirt1 from "@/assets/T-shirt1.jpg";
import tshirt2 from "@/assets/Tshirt2.jpg";
import tshirt3 from "@/assets/T-shirt3.jpg";

//male shirts and tops images

import menshirt1 from "@/assets/tshirt1.png";
import menshirt4 from "@/assets/tshirtmen2.jpg";
import menshirt3 from "@/assets/mentshirt3.jpg";





//women shorts and skirts images
import manouchstyle1 from "@/assets/manouch-style-1.jpg";
import manouchstyle2 from "@/assets/high_waisted_shorts_flat.png";
import shortWomen2 from "@/assets/shortWomen2.jpg";

//man shorts images
import short from "@/assets/short&1.jpg";
import shortman2 from "@/assets/shortman2.jpg";
import shortman3 from "@/assets/short3.jpg";




//WOMEN JACKETS AND COATS
import MANTEAU_1 from "@/assets/MANTEAU_1.jpg";
import H25 from "@/assets/H25.webp";
import MANTEAU_2 from "@/assets/MANTEAU_2.jpg";
import coat1 from "@/assets/coat1.jpg";



import dress1 from "@/assets/dress1.jpg";
import dress2 from "@/assets/dress2.jpg";
import dress3 from "@/assets/dress3.webp";
import dress4 from "@/assets/dress4.webp";
import bannerTshirts from "@/assets/shirt.jpg";
import bannerShirtsTops from "@/assets/shirt4.jpg";
import bannerShortsSkirts from "@/assets/manouch-style-1.jpg";
import bannerDresses from "@/assets/st-john-k11mc21-byqm-red-dress-f25-a-pdp.jpg";
import bannerJacketsCoats from "@/assets/MANTEAU_1.jpg";

export interface Product {
  nameKey: string;
  descriptionKey: string;
  image: any;
}

export interface Collection {
  slug: string;
  bannerImage: any;
  men: Product[];
  women: Product[];
}

/**
 * EDIT THIS DATA TO UPDATE YOUR COLLECTIONS MANUALLY
 */
export const collectionsData: Record<string, Collection> = {
  "shirts": {
    slug: "shirts",
    bannerImage: bannerShirtsTops,
    men: [
      { nameKey: "collection_details.shirts.men.0.name", descriptionKey: "collection_details.shirts.men.0.description", image: productMenSilk },
      { nameKey: "collection_details.shirts.men.1.name", descriptionKey: "collection_details.shirts.men.1.description", image: productMenViscose },
      { nameKey: "collection_details.t-shirts&tops.men.0.name", descriptionKey: "collection_details.t-shirts&tops.men.0.description", image: SH09 },
      { nameKey: "collection_details.t-shirts&tops.men.1.name", descriptionKey: "collection_details.t-shirts&tops.men.1.description", image: menshirt2 },
      { nameKey: "collection_details.t-shirts&tops.men.2.name", descriptionKey: "collection_details.t-shirts&tops.men.2.description", image: productMenCotton },
    ],
    women: [
      { nameKey: "collection_details.shirts.women.0.name", descriptionKey: "collection_details.shirts.women.0.description", image: shirt3 },
      { nameKey: "collection_details.shirts.women.1.name", descriptionKey: "collection_details.shirts.women.1.description", image: shirt1 },
      { nameKey: "collection_details.shirts.women.2.name", descriptionKey: "collection_details.shirts.women.2.description", image: shirt2 },
      { nameKey: "collection_details.shirts.women.3.name", descriptionKey: "collection_details.shirts.women.3.description", image: shirt4 },

    ]
  },
  "t-shirts&tops": {
    slug: "t-shirts&tops",
    bannerImage: bannerTshirts,
    men: [
      { nameKey: "collection_details.t-shirts&tops.men.0.name", descriptionKey: "collection_details.t-shirts&tops.men.0.description", image: menshirt1 },
      { nameKey: "collection_details.t-shirts&tops.men.1.name", descriptionKey: "collection_details.t-shirts&tops.men.1.description", image: menshirt4 },
      { nameKey: "collection_details.t-shirts&tops.men.2.name", descriptionKey: "collection_details.t-shirts&tops.men.2.description", image: menshirt3 },
    ],
    women: [
      { nameKey: "collection_details.t-shirts&tops.women.0.name", descriptionKey: "collection_details.t-shirts&tops.women.0.description", image: tshirt1 },
      { nameKey: "collection_details.t-shirts&tops.women.1.name", descriptionKey: "collection_details.t-shirts&tops.women.1.description", image: tshirt2 },
      { nameKey: "collection_details.t-shirts&tops.women.2.name", descriptionKey: "collection_details.t-shirts&tops.women.2.description", image: tshirt3 },
    ]
  },
  "shorts-skirts": {
    slug: "shorts-skirts",
    bannerImage: bannerShortsSkirts,
    men: [
      { nameKey: "collection_details.shorts-skirts.men.0.name", descriptionKey: "collection_details.shorts-skirts.men.0.description", image: short },
      { nameKey: "collection_details.shorts-skirts.men.1.name", descriptionKey: "collection_details.shorts-skirts.men.1.description", image: shortman2 },
      { nameKey: "collection_details.shorts-skirts.men.2.name", descriptionKey: "collection_details.shorts-skirts.men.2.description", image: shortman3 },
    ],
    women: [
      { nameKey: "collection_details.shorts-skirts.women.0.name", descriptionKey: "collection_details.shorts-skirts.women.0.description", image: manouchstyle1 },
      { nameKey: "collection_details.shorts-skirts.women.1.name", descriptionKey: "collection_details.shorts-skirts.women.1.description", image: manouchstyle2 },
      { nameKey: "collection_details.shorts-skirts.women.2.name", descriptionKey: "collection_details.shorts-skirts.women.2.description", image: shortWomen2 },

    ]
  },
  "dresses": {
    slug: "dresses",
    bannerImage: bannerDresses,
    men: [

    ],
    women: [
      { nameKey: "collection_details.dresses.women.0.name", descriptionKey: "collection_details.dresses.women.0.description", image: dress1 },
      { nameKey: "collection_details.dresses.women.1.name", descriptionKey: "collection_details.dresses.women.1.description", image: dress2 },
      { nameKey: "collection_details.dresses.women.2.name", descriptionKey: "collection_details.dresses.women.2.description", image: dress3 },
      { nameKey: "collection_details.dresses.women.3.name", descriptionKey: "collection_details.dresses.women.3.description", image: dress4 },
      { nameKey: "collection_details.dresses.women.4.name", descriptionKey: "collection_details.dresses.women.4.description", image: productWomenCotton },
      { nameKey: "collection_details.dresses.women.5.name", descriptionKey: "collection_details.dresses.women.5.description", image: productWomenViscose },
    ]
  },
  "jackets-coats": {
    slug: "jackets-coats",
    bannerImage: bannerJacketsCoats,
    men: [

    ],
    women: [
      { nameKey: "collection_details.jackets-coats.women.0.name", descriptionKey: "collection_details.jackets-coats.women.0.description", image: womenCoats },
      { nameKey: "collection_details.jackets-coats.women.1.name", descriptionKey: "collection_details.jackets-coats.women.1.description", image: womenCoats2 },
      { nameKey: "collection_details.jackets-coats.women.2.name", descriptionKey: "collection_details.jackets-coats.women.2.description", image: MANTEAU_1 },
      { nameKey: "collection_details.jackets-coats.women.3.name", descriptionKey: "collection_details.jackets-coats.women.3.description", image: MANTEAU_2 },
      { nameKey: "collection_details.jackets-coats.women.4.name", descriptionKey: "collection_details.jackets-coats.women.4.description", image: H25 },
      { nameKey: "collection_details.jackets-coats.women.5.name", descriptionKey: "collection_details.jackets-coats.women.5.description", image: coat1 },


    ]
  }
};
