const express = require('express');
const authRoutes = require('../../module/v1/auth/routes/auth.routes');
const userRoutes = require('../../module/v1/user/routes/user.routes');
const blogRoutes = require('../../module/v1/blogs/routes/blog.routes');
const productRoutes = require('../../module/v1/product/routes/product.routes');
const categoryRoutes = require('../../module/v1/category/routes/category.routes');
const imageUploadRoutes = require('../../module/v1/image upload/routes/imageUpload.routes');
const brandRoutes = require('../../module/v1/brand/routes/brand.routes');
const addressRoutes = require('../../module/v1/address/routes/address.routes');
const cartRoutes = require('../../module/v1/cart/routes/cart.routes');
const OrderRoutes = require('../../module/v1/orders/routes/order.routes');


const bannerRoutes = require('../../module/v1/homepage/banner/routes/banner.routes');
const galleryRoutes = require('../../module/v1/homepage/gallery/routes/gallery.routes');

const aboutUsRoutes = require('../../module/v1/footer/about us/routes/about-us.routes');
const privacyRoutes = require('../../module/v1/footer/privacy/routes/privacy.routes');
const termRoutes = require('../../module/v1/footer/term-condition/routes/term.routes');
const followRoutes = require('../../module/v1/footer/follow us/routes/follow.routes');
const shopAddress = require('../../module/v1/footer/address/routes/shopAddress.routes');
const wishRoutes = require('../../module/v1/wishlist/routes/wishlist.routes');
const loginImgRoutes = require('../../module/v1/loginpage/login image/routes/login_img.routes')
const registerImgRoutes = require('../../module/v1/loginpage/register image/routes/register_img.routes');
const contactRoutes = require('../../module/v1/footer/contact us/router/contact.router');
const promoRoutes = require('../../module/v1/promo code/routes/promo.routes');
const routess = require('../../module/v1/video upload/routes/videoUpload.routes');

module.exports = () => {
   const api = express.Router();

   authRoutes(api); // fe link remaining while forget password
   userRoutes(api); // user main image rakhni hai?
   blogRoutes(api);
   productRoutes(api); // search functionality pending
   categoryRoutes(api); // get by id categories and subcategories
   imageUploadRoutes(api);
   brandRoutes(api);
   addressRoutes(api);
   cartRoutes(api);
   OrderRoutes(api)
   wishRoutes(api);

   // Home-page routes
   bannerRoutes(api);
   galleryRoutes(api);

   // Footer routes
   aboutUsRoutes(api);
   privacyRoutes(api);
   termRoutes(api);
   followRoutes(api);
   shopAddress(api);
   contactRoutes(api);

   // login page images routes
   loginImgRoutes(api);
   registerImgRoutes(api);

   promoRoutes(api);
   routess(api);
   return api;
}

