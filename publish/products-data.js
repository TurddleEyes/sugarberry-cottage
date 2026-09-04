/* ==========================================================================
   SUGARBERRY COTTAGE - products-data.js
   THIS IS THE FILE THAT FILLS THE PRODUCTS PAGE.

   You can edit it here, or open admin.html and let it write this file for
   you. Either way, upload it to your repository afterwards.

     orderingUrl  where the "Order online" buttons send people. This is your
                  Cash App ordering page. Change it here and every button
                  on the site follows.
     shopOpen     false hides the ordering buttons and shows an
                  opening-soon note instead. The product list below shows
                  either way, so people can always see what you make.

   For each product:
     key      a short id, letters and dashes only. Must be unique, and it
              is what ties a product to its photo file.
     name     shown on the card
     cat      one of: breads, rolls, cookies
     price    what you charge. '' shows "Ask us for a price" instead
     unit     the words after the price, e.g. 'each'
     status   one of: Available, Sold Out, Seasonal, Coming Soon
     desc     one short sentence
     img      the picture file inside images/products/
     photo    words shown in the grey box when there is no picture

   The names, prices and categories below match your Cash App listings, so
   nobody sees one price here and a different one when they go to order.
   If you change a price there, change it here too.
   ========================================================================== */
window.SUGARBERRY = {

  orderingUrl: 'https://cash.app/$sugarberrycottage',

  shopOpen: true,

  products: [
    { key: 'sourdough-artisan', name: 'Artisan Sourdough', cat: 'breads', price: '$15.00', unit: 'each', status: 'Available',
      desc: 'Slow-risen with a crackly crust and an open, chewy crumb.', img: 'sourdough-artisan.jpg', photo: 'Sourdough loaf' },
    { key: 'italian-herb', name: 'Italian & Herb Sourdough', cat: 'breads', price: '$15.00', unit: 'each', status: 'Available',
      desc: 'Seeded and herbed, good warm with butter or oil.', img: 'italian-herb.jpg', photo: 'Herb loaf' },
    { key: 'sandwich-bread', name: 'Sandwich Bread', cat: 'breads', price: '$12.00', unit: 'each', status: 'Available',
      desc: 'A soft white loaf, sliced and ready for lunches.', img: 'sandwich-bread.jpg', photo: 'Sandwich loaf' },
    { key: 'banana-bread', name: 'Banana Bread', cat: 'breads', price: '$15.00', unit: 'each', status: 'Available',
      desc: 'Made with fruit well past ripe, the way it should be, with walnuts.', img: 'banana-bread.jpg', photo: 'Banana bread' },
    { key: 'pumpkin-bread', name: 'Pumpkin Bread', cat: 'breads', price: '$15.00', unit: 'each', status: 'Available',
      desc: 'Spiced and dense, with a thin sugar glaze on top.', img: 'pumpkin-bread.jpg', photo: 'Pumpkin bread' },
    { key: 'cinnamon-raisin-bread', name: 'Cinnamon & Raisin Bread', cat: 'breads', price: '$15.00', unit: 'each', status: 'Available',
      desc: 'Swirled through with cinnamon sugar. Very good toasted.', img: 'cinnamon-raisin-bread.jpg', photo: 'Cinnamon raisin bread' },

    { key: 'roll-regular', name: 'Classic Rolls', cat: 'rolls', price: '$5.00', unit: 'each', status: 'Available',
      desc: 'The classic, soft and generously iced.', img: 'roll-regular.jpg', photo: 'Cinnamon roll' },
    { key: 'roll-strawberry', name: 'Strawberry Rolls', cat: 'rolls', price: '$8.00', unit: 'each', status: 'Available',
      desc: 'Cinnamon rolls with strawberries folded through the glaze.', img: 'roll-strawberry.jpg', photo: 'Strawberry roll' },
    { key: 'roll-blueberry', name: 'Blueberry Rolls', cat: 'rolls', price: '$8.00', unit: 'each', status: 'Available',
      desc: 'Blueberries baked right into the swirl.', img: 'roll-blueberry.jpg', photo: 'Blueberry roll' },
    { key: 'roll-chocolate', name: 'Chocolate Rolls', cat: 'rolls', price: '$8.00', unit: 'each', status: 'Available',
      desc: 'For the chocolate end of the table, finished with shavings.', img: 'roll-chocolate.jpg', photo: 'Chocolate roll' },

    { key: 'sugar-cookie', name: 'Sugar Cookies', cat: 'cookies', price: '$2.50', unit: 'each', status: 'Available',
      desc: 'Soft and buttery, with vanilla frosting and sprinkles.', img: 'sugar-cookie.jpg', photo: 'Sugar cookies' },
    { key: 'choc-chip-caramel', name: 'Chocolate Chip Caramel Cookies', cat: 'cookies', price: '$2.50', unit: 'each', status: 'Available',
      desc: 'Thick chocolate chip cookies under a caramel drizzle.', img: 'choc-chip-caramel.jpg', photo: 'Chocolate chip caramel cookies' },
    { key: 'apple-caramel', name: 'Apple Caramel Cookies', cat: 'cookies', price: '$2.50', unit: 'each', status: 'Available',
      desc: 'Soft cookies with apple pieces and a caramel drizzle.', img: 'apple-caramel.jpg', photo: 'Apple caramel cookies' },
    { key: 'pumpkin-spice-cookie', name: 'Pumpkin Spice Cookies', cat: 'cookies', price: '$2.50', unit: 'each', status: 'Available',
      desc: 'Spiced pumpkin cookies with cream cheese frosting and a dusting of cinnamon.', img: 'pumpkin-spice-cookie.jpg', photo: 'Pumpkin spice cookies' },
    { key: 'oatmeal-cream-pie', name: 'Oatmeal Cream Pie', cat: 'cookies', price: '$6.00', unit: 'each', status: 'Available',
      desc: 'Two chewy oatmeal cookies with cream filling between them.', img: 'oatmeal-cream-pie.jpg', photo: 'Oatmeal cream pie' }
  ]
};
