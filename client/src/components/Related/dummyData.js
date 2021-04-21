// for product 17067
const sampleProduct = [
  {
      "id": 17067,
      "campus": "hr-rfp",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2021-02-23T04:22:44.728Z",
      "updated_at": "2021-02-23T04:22:44.728Z"
  }
];

// for 17067
const sampleRelatedId = [
  17067,
  17068,
  17069,
  17074,
  17073
];

const sampleRelatedInfo = [
  {
    "id": 17067,
    "campus": "hr-rfp",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in t  even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-02-23T04:22:44.728Z",
    "updated_at": "2021-02-23T04:22:44.728Z",
    "features": [
      {
          "feature": "Fabric",
          "value": "Canvas"
      },
      {
          "feature": "Buttons",
          "value": "Brass"
      }
    ]
  },
  {
    "id": 17068,
    "campus": "hr-rfp",
    "name": "Bright Future Sunglasses",
    "slogan": "You've got to wear shades",
    "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    "category": "Accessories",
    "default_price": "69.00",
    "created_at": "2021-02-23T04:22:44.728Z",
    "updated_at": "2021-02-23T04:22:44.728Z",
    "features": [
        {
            "feature": "Lenses",
            "value": "Ultrasheen"
        },
        {
            "feature": "UV Protection",
            "value": null
        },
        {
            "feature": "Frames",
            "value": "LightCompose"
        }
    ]
  },
  {
    "id": 17069,
    "campus": "hr-rfp",
    "name": "Morning Joggers",
    "slogan": "Make yourself a morning person",
    "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    "category": "Pants",
    "default_price": "40.00",
    "created_at": "2021-02-23T04:22:44.728Z",
    "updated_at": "2021-02-23T04:22:44.728Z",
    "features": [
        {
            "feature": "Fabric",
            "value": "100% Cotton"
        },
        {
            "feature": "Cut",
            "value": "Skinny"
        }
    ]
  },
  {
    "id": 17074,
    "campus": "hr-rfp",
    "name": "YEasy 350",
    "slogan": "Just jumped over jumpman",
    "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
    "category": "Kicks",
    "default_price": "450.00",
    "created_at": "2021-02-23T04:22:44.728Z",
    "updated_at": "2021-02-23T04:22:44.728Z",
    "features": [
        {
            "feature": "Sole",
            "value": "Rubber"
        },
        {
            "feature": "Material",
            "value": "FullControlSkin"
        },
        {
            "feature": "Stitching",
            "value": "Double Stitch"
        }
    ]
  },
  {
    "id": 17073,
    "campus": "hr-rfp",
    "name": "Blues Suede Shoes",
    "slogan": "2019 Stanley Cup Limited Edition",
    "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
    "category": "Dress Shoes",
    "default_price": "120.00",
    "created_at": "2021-02-23T04:22:44.728Z",
    "updated_at": "2021-02-23T04:22:44.728Z",
    "features": [
        {
            "feature": "Sole",
            "value": "Rubber"
        },
        {
            "feature": "Material",
            "value": "FullControlSkin"
        },
        {
            "feature": "Stitching",
            "value": "Double Stitch"
        }
    ]
  }
];

const sampleReviews = {
  "product_id": "17067",
  "ratings": {
      "3": "2",
      "4": "7",
      "5": "1"
  },
  "recommended": {
      "false": "9",
      "true": "1"
  },
  "characteristics": {
      "Fit": {
          "id": 57222,
          "value": "4.0000000000000000"
      },
      "Length": {
          "id": 57223,
          "value": "3.5000000000000000"
      },
      "Comfort": {
          "id": 57224,
          "value": "5.0000000000000000"
      },
      "Quality": {
          "id": 57225,
          "value": "4.0000000000000000"
      }
  }
};

export default {
  sampleProduct,
  sampleRelatedId,
  sampleRelatedInfo,
  sampleReviews
};