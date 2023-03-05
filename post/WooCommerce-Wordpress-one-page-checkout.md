---
title: WooCommerce + Wordpress one page checkout tutorial for digital products
date: 2021-02-20 20:59:39
keywords: Wordpress, WooCommerce, One Page Checkout, Checkout, AWS, AWS Lightsail, Lightsail
description: How to setup WooCommerce + Wordpress for one page setup
level: Intermediate
layout: post.html
---
> Wordpress + WooComemrce is a great combination to use for setting up a store to sell digital products. Though it requires some technical knowledge, overall it results in savings. 

## My tech stack
1. Wordpress setup on [AWS Lightsail](https://aws.amazon.com/lightsail/projects/wordpress/) - overall costs 3.5$ a month

# 1. Add WooCommerce
Go to **Plugins > Add new** and search for Woocommerce
![Woocommerce plugin](https://res.cloudinary.com/poorna/image/upload/v1613836975/my-blog/Screenshot_2021-02-20_Add_Plugins_Personal_Branding_Blueprint_WordPress.png)

Download and activate the plugin

# 2. Setup WooCommerce
Navigate to **Woocommerce > Settings** 
Then select the **Products Tab**
> Disable the two checkboxes

![Disable redirect to cart](https://res.cloudinary.com/poorna/image/upload/c_scale,w_900/v1613842787/my-blog/Screenshot_2021-02-20_WooCommerce_settings_Personal_Branding_Blueprint_WordPress.png)

# 3. Modify WooCommerce Product settings
Make sure the checkbox Sold Individually is checked under **Product Data > Inventory**
![Sold Individually](https://res.cloudinary.com/poorna/image/upload/v1613843765/my-blog/Screenshot_2021-02-20_Edit_product_Personal_Branding_Blueprint_WordPress.png)

# 4. Locate the checkout page and copy the link
Find the checkout page and open it
![Checkout page](https://res.cloudinary.com/poorna/image/upload/v1613845068/my-blog/Screenshot_2021-02-20_Pages_Personal_Branding_Blueprint_WordPress.png)

Now on the right side of the page, copy the permalink
![permalink](https://res.cloudinary.com/poorna/image/upload/v1613845682/my-blog/Screenshot_2021-02-20_Edit_Page_Personal_Branding_Blueprint_WordPress.png)

My perma link for checkout page is 
```
http://35.154.187.243/?page_id=283
```


Navigate to the products menu on the WP dashboard and click on it
![Cart link](https://res.cloudinary.com/poorna/image/upload/v1613846701/my-blog/Screenshot_from_2021-02-21_00-14-50.png)
My product ID is **300**


Now add the URL params to the cart URL this way
```
http://35.154.187.243/?page_id=283&add-to-cart= <product ID> &quantity=1

Here's mine:
http://35.154.187.243/?page_id=283&add-to-cart=300&quantity=1
```

# 5. Now use the link we just created and add it to any button as a hyperlink