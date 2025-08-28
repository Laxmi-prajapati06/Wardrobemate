import '../styles/components.css';

const outfitDatabase = {
  bodyType: {
    'Hourglass': [
      { 
        id: 1, 
        name: 'Wrap Dress', 
        description: 'Accentuates your waist and balances proportions', 
        image: 'https://whysobluelove.com/cdn/shop/files/4Untitled-1_3b5897d4-f994-4e3d-8e26-c6ca4984058b_1200x1200.jpg?v=1743517063' 
      },
      { 
        id: 2, 
        name: 'Belted Trench', 
        description: 'Defines your waist while elongating your silhouette', 
        image: 'https://www.apricotonline.com/dw/image/v2/BFZV_PRD/on/demandware.static/-/Sites-master-catalog-GB/default/dweb9057d6/images/large/5051839842175_2.jpg?sw=580&sh=772' 
      },
      { 
        id: 3, 
        name: 'High-Waisted Pants', 
        description: 'Highlights your narrow waist', 
        image: 'https://static.india.com/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-02-at-2.32.13-PM.jpeg' 
      }
    ],
    'Pear': [
      { 
        id: 4, 
        name: 'A-Line Skirt', 
        description: 'Balances your proportions by drawing attention upward', 
        image: 'https://i.etsystatic.com/25472123/r/il/b6ca83/3711985358/il_570xN.3711985358_j8og.jpg' 
      },
      { 
        id: 5, 
        name: 'Structured Jacket', 
        description: 'Adds volume to your upper body', 
        image: 'https://media.littlewoods.com/i/littlewoods/WAM8Q_SQ1_0000000020_BLUE_MDf' 
      },
      { 
        id: 6, 
        name: 'Dark Wash Jeans', 
        description: 'Slims your lower half', 
        image: 'https://media.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/lifestyle/1000014082970-Blue-Blue-1000014082970_01-2100.jpg' 
      }
    ],
    'Rectangle': [
      { 
        id: 7, 
        name: 'Peplum Top', 
        description: 'Creates the illusion of curves', 
        image: 'https://images.meesho.com/images/products/405893130/xecv6_512.webp' 
      },
      { 
        id: 8, 
        name: 'Layered Outfit', 
        description: 'Adds dimension to your silhouette', 
        image: 'https://www.aachho.com/cdn/shop/products/7_f6fd022a-0b40-4c6d-9de2-d31b835f37cb_1080x.png?v=1684508110' 
      },
      { 
        id: 9, 
        name: 'Ruffled Dress', 
        description: 'Adds feminine details to create shape', 
        image: 'https://d1it09c4puycyh.cloudfront.net/920x1300/catalog/product/6/0/600W-PINK_1.jpg' 
      }
    ],
    'Inverted Triangle': [
      { 
        id: 10, 
        name: 'V-Neck Top', 
        description: 'Draws attention downward', 
        image: 'https://img1.theiconic.com.au/w2MHuQT7asshV6y9DLs-iYoEjGo=/fit-in/406x512/filters:fill(ffffff):quality(90)/http%3A%2F%2Fstatic.theiconic.com.au%2Fp%2Fbelle-bloom-1208-4761202-1.jpg' 
      },
      { 
        id: 11, 
        name: 'Flared Pants', 
        description: 'Balances your shoulder width', 
        image: 'https://nikkikclothing.com/cdn/shop/files/Formalblue1.jpg?v=1713254918' 
      },
      { 
        id: 12, 
        name: 'A-Line Dress', 
        description: 'Creates balance with your upper body', 
        image: 'https://i.etsystatic.com/7799304/r/il/42628c/2172949877/il_570xN.2172949877_6hng.jpg' 
      }
    ]
  },
  color: {
    'Cool': [
      { 
        id: 13, 
        name: 'Sapphire Blue', 
        description: 'Complements your cool undertones', 
        image: 'https://htmlcolorcodes.com/assets/images/colors/sapphire-blue-color-solid-background-1920x1080.png' 
      },
      { 
        id: 14, 
        name: 'Emerald Green', 
        description: 'Enhances your natural coloring', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ45sGNWkn_mNz77tIhsrH11VQRaZK3UQ_ihw&s' 
      },
      { 
        id: 15, 
        name: 'Ruby Red', 
        description: 'Makes your skin glow', 
        image: 'https://preview.colorkit.co/color/9b111e.png?size=wallpaper&static=true' 
      }
    ],
    'Warm': [
      { 
        id: 16, 
        name: 'Mustard Yellow', 
        description: 'Works with your golden undertones', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8dkZzXZwgtwIBfmc1q5vfvNexJN5FK5Stg&s' 
      },
      { 
        id: 17, 
        name: 'Terracotta', 
        description: 'Echoes your warm complexion', 
        image: 'https://htmlcolorcodes.com/assets/images/colors/terra-cotta-color-solid-background-1920x1080.png' 
      },
      { 
        id: 18, 
        name: 'Olive Green', 
        description: 'Natural harmony with your skin', 
        image: 'https://unitedfabrics.s3.amazonaws.com/files/products/spirit-us-529-olive-green.jpg' 
      }
    ],
    'Neutral': [
      { 
        id: 19, 
        name: 'Soft Mauve', 
        description: 'Subtle and sophisticated', 
        image: 'https://encycolorpedia.com/b59ca6.png' 
      },
      { 
        id: 20, 
        name: 'Dusty Rose', 
        description: 'Universal flattering shade', 
        image: 'https://ih1.redbubble.net/image.1926890298.2002/raf,360x360,075,t,fafafa:ca443f4786.jpg' 
      },
      { 
        id: 21, 
        name: 'Taupe', 
        description: 'Elegant neutral for any occasion', 
        image: 'https://preview.colorkit.co/color/B9A281.png?type=article-preview-logo&size=social&colorname=Taupe' 
      }
    ]
  },
  occasion: {
    'Casual Day Out': [
      { 
        id: 22, 
        name: 'Denim & White Tee', 
        description: 'Classic casual combo', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq3E4UN8Z2_GlijNqPa7a0vNVWPbr4vZErgt39Zo28TnVpiZLSoBJPbhLJ0Lpm6PVnTts&usqp=CAU' 
      },
      { 
        id: 23, 
        name: 'Midi Dress', 
        description: 'Effortlessly stylish', 
        image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/30298663/2024/7/22/d4a0c2fe-bc16-4977-8ef8-38902f99faf51721653747958KALINIPrintGeorgetteA-LineMidiDress1.jpg' 
      },
      { 
        id: 24, 
        name: 'Jumpsuit', 
        description: 'Comfortable yet put-together', 
        image: 'https://www.libas.in/cdn/shop/files/35098.jpg?v=1738922385' 
      }
    ],
    'Business Formal': [
      { 
        id: 25, 
        name: 'Tailored Suit', 
        description: 'Sharp and professional', 
        image: 'https://cdn.prod.website-files.com/661e56bde12bf275217d8b65/66fd490fb08bd1a7f5d0747d_woman%20black%20suit.webp' 
      },
      { 
        id: 26, 
        name: 'Sheath Dress', 
        description: 'Polished and powerful', 
        image: 'https://m.media-amazon.com/images/I/710CMSVnbEL._AC_UY1100_.jpg' 
      },
      { 
        id: 27, 
        name: 'Pencil Skirt & Blouse', 
        description: 'Corporate classic', 
        image: 'https://joop.com/medias/sys_master/root/hcf/h80/9815932665886/9815932665886.jpg' 
      }
    ],
    'Cocktail Party': [
      { 
        id: 28, 
        name: 'LBD', 
        description: 'Little Black Dress - always appropriate', 
        image: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/14933484/2021/8/10/f84f5864-d0d8-4613-92e6-e55d057b38c61628569184967WoowZerzBlackDrapePuffedSleeveDress1.jpg' 
      },
      { 
        id: 29, 
        name: 'Sequin Top & Trousers', 
        description: 'Festive and fashionable', 
        image: 'https://www.na-kd.com/cdn-cgi/image/width=300,quality=80,sharpen=0.3/globalassets/nakd_home_party_sequin_pants_1736-000012-2059_60109.jpg?ref=96D5065A8C' 
      },
      { 
        id: 30, 
        name: 'Silk Slip Dress', 
        description: 'Elegant and trendy', 
        image: 'https://m.media-amazon.com/images/I/71y9H4alHHL._AC_UY1100_.jpg' 
      }
    ],
    "Date Night": [
    { 
      id: 31, 
      name: "Off-Shoulder Bodycon Dress", 
      description: "Flirty and figure-hugging with romantic details", 
      image: "https://www.alamodelabel.in/cdn/shop/files/703E2702-326C-4784-9D87-1217B5EC193D_800x.jpg?v=1735461941" 
    },
    { 
      id: 32, 
      name: "Jumpsuit with Statement Earrings", 
      description: "Modern alternative to dresses with bold accessories", 
      image: "https://cdn.aboutstatic.com/file/images/1f6e6a90d605282676da04492a0177f0.jpg?quality=75&height=480&width=360" 
    },
    { 
      id: 45, 
      name: "Silk Slip Dress + Leather Jacket", 
      description: "Edgy femininity with layered textures", 
      image: "https://i.pinimg.com/736x/48/ce/b7/48ceb7e61428764f602b4be52813298b.jpg" 
    }
  ],
  "Wedding Guest": [
    { 
      id: 33, 
      name: "Pastel Midi Dress", 
      description: "Garden party appropriate with floral details", 
      image: "https://i0.wp.com/greenweddingshoes.com/wp-content/uploads/2025/03/yellow-cottagecore-midi-best-garden-spring-wedding-guest-dresses.jpg?fit=728%2C9999" 
    },
    { 
      id: 34, 
      name: "Chic Suit Set", 
      description: "Sophisticated alternative to dresses", 
      image: "https://img.faballey.com/images/Product/XKS00317Z/d3.jpg" 
    },
    { 
      id: 46, 
      name: "Pleated Satin Gown", 
      description: "Black-tie ready with elegant ruching", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLyKPGCi596zR2nCPnGmeipVxSTtzwrSXsyA&s" 
    }
  ],
  "Job Interview": [
    { 
      id: 35, 
      name: "Tailored Blazer Dress", 
      description: "Professional yet feminine silhouette", 
      image: "https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2023/08/hockerty_woman_wearing_interview_outfit_conservative_outfit_cor_022f1a33_279c_4a17_a030_1c8bec621b5f.jpg" 
    },
    { 
      id: 36, 
      name: "Pencil Skirt & Blouse Set", 
      description: "Classic corporate look", 
      image: "https://i.pinimg.com/736x/75/2b/2a/752b2ad36dbf30f92b66ee77beb03895.jpg" 
    },
    { 
      id: 47, 
      name: "Wide-Leg Trousers + Structured Top", 
      description: "Powerful and contemporary", 
      image: "https://cdn.shopify.com/s/files/1/0275/7761/4381/files/timothee-leg-pants-navy-outfit_7864d9cf-454b-478a-8dfc-9e35fbe3a37f.jpg?v=1741857284" 
    }
  ],
  "Vacation": [
    { 
      id: 37, 
      name: "Wrap Maxi Dress", 
      description: "Easy-breezy resort wear", 
      image: "https://m.media-amazon.com/images/I/915xWSiRlhL._AC_UY1100_.jpg" 
    },
    { 
      id: 38, 
      name: "Strappy Sundress", 
      description: "Easy-breezy with a playful print", 
      image: "https://i.pinimg.com/736x/39/54/55/3954558b8b5f519f0292be0feadf7773.jpg" 
    },
    { 
      id: 48, 
      name: "Linen Jumpsuit", 
      description: "Breathable one-and-done sightseeing outfit", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2rRrrRNInjjyn9LdAtXqI2xnrvZ5sBu10YSOcRjjWq2JvqeWoYlPRhn8TG7IR44PAyeM&usqp=CAU" 
    }
  ],
  "Formal Event": [
    { 
      id: 39, 
      name: "Mermaid Gown", 
      description: "Red carpet-worthy glamour", 
      image: "https://www.siaoryne.com/cdn/shop/products/1_292.jpg?v=1578297540&width=1200" 
    },
    { 
      id: 40, 
      name: "Tuxedo Dress", 
      description: "Androgynous elegance", 
      image: "https://media-api.xogrp.com/images/8cb3a2ec-3208-4da3-8f24-b3e5a9b46c6b~rs_768.h-cr_0.36.1087.1485" 
    },
    { 
      id: 49, 
      name: "Cape Evening Dress", 
      description: "Dramatic silhouette with detachable cape", 
      image: "https://i.pinimg.com/736x/01/98/17/01981738e53710093e59f4c6564ec799.jpg" 
    }
  ],
  "Night Out": [
    { 
      id: 41, 
      name: "Leather Mini Dress", 
      description: "Edgy nighttime look", 
      image: "https://petalandpup.com.au/cdn/shop/products/petal-and-pup-au-bottoms-carly-faux-leather-mini-skirt-black-31536026353775.jpg?v=1664328838&width=600" 
    },
    { 
      id: 42, 
      name: "Bodysuit with Wide-Leg Pants", 
      description: "Sexy yet comfortable", 
      image: "https://natalieyerger.com/wp-content/uploads/2023/02/ny-202302-how-to-style-wide-leg-jeans-006-scaled.jpg" 
    },
    { 
      id: 50, 
      name: "Corset Top + Tailored Trousers", 
      description: "Mix of edgy and elegant", 
      image: "https://assets.ajio.com/medias/sys_master/root/20230526/pL0R/64706f30d55b7d0c63142f9a/-473Wx593H-466196320-navy-MODEL5.jpg" 
    }
  ],
  "Brunch": [
    { 
      id: 43, 
      name: "Tiered Ruffle Dress", 
      description: "Playful daytime elegance", 
      image: "https://images.meesho.com/images/products/469975705/gi4fk_512.webp" 
    },
    { 
      id: 44, 
      name: "Denim Jacket with Flowy Skirt", 
      description: "Casual chic combination", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLWlqtlFe_pBcg4jQu45XECNJUA_o3G4KzNjCBp4g8aJloVeuZVm3mudSlLBhYt6V7sg&usqp=CAU" 
    },
    { 
      id: 51, 
      name: "Puff-Sleeve Mini Dress", 
      description: "Instagram-worthy with tea-length hem", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQzUizOivPVOoqFR7GFHTTzxFZBatHr6DdWqUz8PiNkqYU60v7O2hWgfuWgkbvGZAQAbI&usqp=CAU" 
    }
  ]
  }
};

const RecommendationEngine = {
  getBodyTypeRecommendations: (userData) => {
    return outfitDatabase.bodyType[userData.bodyType] || [];
  },
  getColorRecommendations: (userData) => {
    const undertone = userData.skinTone.includes('Cool') ? 'Cool' : 
                     userData.skinTone.includes('Warm') ? 'Warm' : 'Neutral';
    return outfitDatabase.color[undertone] || [];
  },
  getOccasionRecommendations: (userData) => {
    return outfitDatabase.occasion[userData.occasion] || [];
  },
  generatePersonalizedPrompt: (userData) => {
    const { bodyType, skinTone, occasion } = userData;
    const undertone = skinTone.includes('Cool') ? 'cool' : 
                     skinTone.includes('Warm') ? 'warm' : 'neutral';
    return `Suggest a ${occasion || 'formal'} outfit for a woman with ${bodyType || 'hourglass'} body type and a ${undertone} skin tone`;
  },
  getAllRecommendations: (userData) => {
    return {
      bodyType: this.getBodyTypeRecommendations(userData),
      color: this.getColorRecommendations(userData),
      occasion: this.getOccasionRecommendations(userData)
    };
  }
};

export default RecommendationEngine;