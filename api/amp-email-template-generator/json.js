const jsonConvertor = require('./lib/json-convertor');
const axios = require('axios');

//link bath towel
// const productDataUrls = [
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-bath-towel_color=SavageBeige-Black&dwvar_links-embroidered-bath-towel_size=BathTowel&pid=links-embroidered-bath-towel&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-bath-towel_color=BlueNavy-Savage%20Beige&dwvar_links-embroidered-bath-towel_size=BathTowel&pid=links-embroidered-bath-towel&quantity=1',
//   // 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-bath-towel_color=White-Milk&dwvar_links-embroidered-bath-towel_size=BathTowel&pid=links-embroidered-bath-towel&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-bath-towel_color=Milk-Milk&dwvar_links-embroidered-bath-towel_size=BathTowel&pid=links-embroidered-bath-towel&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-bath-towel_color=CeladonGreen-Savage%20Beige&dwvar_links-embroidered-bath-towel_size=BathTowel&pid=links-embroidered-bath-towel&quantity=1',
// ];

//bed sheet
// const productDataUrls = [
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sheet-set_color=BlueNavy-Savage%20Beige&dwvar_links-embroidered-sheet-set_size=Queen&pid=links-embroidered-sheet-set&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sheet-set_color=Chestnut-Black&dwvar_links-embroidered-sheet-set_size=Queen&pid=links-embroidered-sheet-set&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sheet-set_color=White-Milk&dwvar_links-embroidered-sheet-set_size=Queen&pid=links-embroidered-sheet-set&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sheet-set_color=SavageBeige-Cliff%20Grey&dwvar_links-embroidered-sheet-set_size=Queen&pid=links-embroidered-sheet-set&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sheet-set_color=Milk-Milk&dwvar_links-embroidered-sheet-set_size=Queen&pid=links-embroidered-sheet-set&quantity=1',
// ];

//cover
// const productDataUrls = [
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-duvet-cover_color=BlueNavy-Savage%20Beige&dwvar_links-embroidered-duvet-cover_size=Queen&pid=links-embroidered-duvet-cover&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-duvet-cover_color=Chestnut-Black&dwvar_links-embroidered-duvet-cover_size=Queen&pid=links-embroidered-duvet-cover&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-duvet-cover_color=White-Milk&dwvar_links-embroidered-duvet-cover_size=Queen&pid=links-embroidered-duvet-cover&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-duvet-cover_color=SavageBeige-Cliff%20Grey&dwvar_links-embroidered-duvet-cover_size=Queen&pid=links-embroidered-duvet-cover&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-duvet-cover_color=Milk-Milk&dwvar_links-embroidered-duvet-cover_size=Queen&pid=links-embroidered-duvet-cover&quantity=1',
//   ];

//pillow
// const productDataUrls = [
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-decorative-pillow_color=BlueNavy&dwvar_cavalry-decorative-pillow_size=Large&pid=cavalry-decorative-pillow&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-decorative-pillow_color=SavageBeige&dwvar_cavalry-decorative-pillow_size=Large&pid=cavalry-decorative-pillow&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-decorative-pillow_color=Grey&dwvar_cavalry-decorative-pillow_size=Large&pid=cavalry-decorative-pillow&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-decorative-pillow_color=Milk&dwvar_cavalry-decorative-pillow_size=Large&pid=cavalry-decorative-pillow&quantity=1',
//   ];

//sham
// const productDataUrls = [
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=CeladonGreen-Savage%20Beige&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=Chestnut-Black&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=BlueNavy-Savage%20Beige&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=White-Milk&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=SavageBeige-Cliff%20Grey&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=Milk-Milk&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_links-embroidered-sham_color=SavageBeige-Black&dwvar_links-embroidered-sham_size=Standard&pid=links-embroidered-sham&quantity=1',
//   ];

//bed
// const productDataUrls = [
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-bedspread_color=BlueNavy&dwvar_cavalry-bedspread_size=King&pid=cavalry-bedspread&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-bedspread_color=SavageBeige&dwvar_cavalry-bedspread_size=King&pid=cavalry-bedspread&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-bedspread_color=Grey&dwvar_cavalry-bedspread_size=King&pid=cavalry-bedspread&quantity=1',
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_cavalry-bedspread_color=Milk&dwvar_cavalry-bedspread_size=King&pid=cavalry-bedspread&quantity=1',
//   ];


//noblesse

// const productDataUrls = [
// 'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_noblesse-mens-classic-pyjamas_color=White-Blue&dwvar_noblesse-mens-classic-pyjamas_size=Medium&pid=noblesse-mens-classic-pyjamas&quantity=1'
// ];


// ascot

// const productDataUrls = [
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_ascot-robe_color=Blue&dwvar_ascot-robe_size=Medium&pid=ascot-robe&quantity=1'
// ];


//give-the-gift
// const products = [
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_noblesse-mens-classic-pyjamas_color=White-Blue&dwvar_noblesse-mens-classic-pyjamas_size=Medium&pid=noblesse-mens-classic-pyjamas&quantity=1'
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_ascot-robe_color=Blue&dwvar_ascot-robe_size=Medium&pid=ascot-robe&quantity=1'
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_glenpark-pyjamas_color=Bordeaux&dwvar_glenpark-pyjamas_size=Medium&pid=glenpark-pyjamas&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_glenpark-pyjamas_color=Tabacco&dwvar_glenpark-pyjamas_size=Medium&pid=glenpark-pyjamas&quantity=1'
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_bernal-pyjamas_color=LightBlue-White&dwvar_bernal-pyjamas_size=Medium&pid=bernal-pyjamas&quantity=1'
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_kepler%20-slipper_color=Blue&dwvar_kepler%20-slipper_size=44&pid=kepler%20-slipper&quantity=1',
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_jay-slipper_color=Black&dwvar_jay-slipper_size=41&pid=jay-slipper&quantity=1',
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_niceville-pyjamas_color=Sapphire&dwvar_niceville-pyjamas_size=Extra-Large&pid=niceville-pyjamas&quantity=1',
//   ],
//
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_anacapri-pyjamas_color=Beige-LighBl&dwvar_anacapri-pyjamas_size=Medium&pid=anacapri-pyjamas&quantity=1'
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pave-slippers_color=Sapphire&dwvar_pave-slippers_size=41&pid=pave-slippers&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pave-slippers_color=Chocolate&dwvar_pave-slippers_size=41&pid=pave-slippers&quantity=1',
//   ],
// ];


// const products = [
//   ['https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-decorative-pillow_color=PowderPink&dwvar_luxury-lozenge-decorative-pillow_size=Small&pid=luxury-lozenge-decorative-pillow&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-decorative-pillow_color=SavageBeige&dwvar_luxury-lozenge-decorative-pillow_size=Small&pid=luxury-lozenge-decorative-pillow&quantity=1',
//   'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-decorative-pillow_color=CeladonGreen&dwvar_luxury-lozenge-decorative-pillow_size=Small&pid=luxury-lozenge-decorative-pillow&quantity=1',
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-bedspread_color=PowderPink&dwvar_luxury-lozenge-bedspread_size=OneSize&pid=luxury-lozenge-bedspread&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-bedspread_color=SavageBeige&dwvar_luxury-lozenge-bedspread_size=OneSize&pid=luxury-lozenge-bedspread&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-lozenge-bedspread_color=CeladonGreen&dwvar_luxury-lozenge-bedspread_size=OneSize&pid=luxury-lozenge-bedspread&quantity=1',
//   ],
//   [
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=PowderPink&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=BlueNavy&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=Beige&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=Black&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=Anthracite&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=Milk&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//     'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_pure-cashmere-throw_color=CeladonGreen&dwvar_pure-cashmere-throw_size=OneSize&pid=pure-cashmere-throw&quantity=1',
//   ]
// ];

const products = [
  [
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_triplo-bourdon-bath-towel_color=White-Milk&dwvar_triplo-bourdon-bath-towel_size=BathTowel&pid=triplo-bourdon-bath-towel&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_triplo-bourdon-bath-towel_color=White-SavageBeige&dwvar_triplo-bourdon-bath-towel_size=BathTowel&pid=triplo-bourdon-bath-towel&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_triplo-bourdon-bath-towel_color=White-BlueNavy&dwvar_triplo-bourdon-bath-towel_size=BathTowel&pid=triplo-bourdon-bath-towel&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_triplo-bourdon-bath-towel_color=White-SlateGrey&dwvar_triplo-bourdon-bath-towel_size=BathTowel&pid=triplo-bourdon-bath-towel&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_triplo-bourdon-bath-towel_color=White-Black&dwvar_triplo-bourdon-bath-towel_size=BathTowel&pid=triplo-bourdon-bath-towel&quantity=1',
     ],
  [
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-shimmer-velvet-decorative-pillow_color=Milk-Gold&dwvar_luxury-shimmer-velvet-decorative-pillow_size=OneSize&pid=8050844160080&quantity=1',
   ],
  [
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-herringbone-bedspread_color=Chestnut&dwvar_luxury-herringbone-bedspread_size=King&pid=luxury-herringbone-bedspread&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-herringbone-bedspread_color=SlateGrey&dwvar_luxury-herringbone-bedspread_size=King&pid=luxury-herringbone-bedspread&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-herringbone-bedspread_color=SavageBeige&dwvar_luxury-herringbone-bedspread_size=King&pid=luxury-herringbone-bedspread&quantity=1',
    'https://www.frette.com/on/demandware.store/Sites-Frette-Site/en_US/Product-Variation?dwvar_luxury-herringbone-bedspread_color=Milk&dwvar_luxury-herringbone-bedspread_size=King&pid=luxury-herringbone-bedspread&quantity=1',
  ]
];




const run = async _ =>{


  const rootUrl = 'https://www.frette.com/en_US';
  let _products = [];


  for (let x = 0; x< products.length; x ++ ){

    let _singleProduct = [];
    let productDataUrls = products[x];

    for (let i = 0; i< productDataUrls.length; i++){
      let url = productDataUrls[i];
      let jsonString = (await axios.get(url)).data;
      let productJson = await jsonConvertor(jsonString, {rootUrl})
      _singleProduct.push(productJson);
    }

    _products.push(_singleProduct);

  }


  let data = {
    "website": "https://www.frette.com",
    "campaign": {
      name:'556690_09152020_FW2020Launch',
      headline: '',
      heroImage: {
        url: '',
        width: 600,
        height: 600,
      },
      description: '',
      //attach this to vendor's url if needed
      queries: {
      },
    },
    "url": "https://www.frette.com/en_US/links-embroidered-bath-towel.html",
    "vendor": {
      shop_name: "www.frette.com",
      name: "frette",
      termsAndConditionURL: null,
      enforceTerms: false,
      "domain": "www.frette.com",
    },
    "products": [
    ],
  };

  data.products.push(_products);

  // console.log(JSON.stringify(data,null, '  '));
  console.log(JSON.stringify(_products,null, '  '));
}


run();
