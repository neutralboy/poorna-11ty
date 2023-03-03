---
title: Wordpress migration checklist for Bitnami without any plugins using the terminal
date: 2022-10-18 20:59:39
keywords: Wordpress, Bitnami, AWS
description: A step by step tutorial on how to migrate a Bitnami Wordpress instance.
level: Intermediate
layout: post.html
image: https://poorna-657a.s3.ap-south-1.amazonaws.com/Screenshot+from+2022-10-18+18-44-04.png
---

This checklist has been written by me since I keep running into the same scenario over and over again during migrations where I forget a simple step and have to repeat everything again.

Think of this tutorial on how to perform migration of an existing Wordpress instance. This tutorial assumes you have knowledge of basic linux commands.

I will be using a [Bitnami Wordpress installation](https://aws.amazon.com/marketplace/pp/prodview-bzstv3wbn5wkq?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) on AWS EC2 to demonstrate.
Login to your Wordpress instance and find the installation path of wordpress.

![Bitnami Wordpress](https://poorna-657a.s3.ap-south-1.amazonaws.com/Screenshot+from+2022-10-18+18-01-15.png)

My installation is located at `/home/<username>/stack/wordpress` . 

> Wordpress stores its data in 3 main places:
> 	1. `/wp-content/` folder where all the plugins and theme files are located
> 	2. Database (usually mysql, mariadb or postgres) where data on authentication, users and website content
> 	3. `wp-config.php` where config details such as website URL and database credentials are located

Let's zip up the `/wp-content/` folder so that it can be downloaded onto my computer
```bash
$~ zip -r ./wp-content wp-content.zip
```
Now lets connect to the database and back it up
With the database credentials lets dump the SQL into a file
```shell
$~ mysqldump -u <username> -p <database_name> > backup.sql
```
Now lets download the backed up files onto our system using scp
```shell
$~ scp <username>@<ip>:/home/<username>/stack/wordpress/wp-content.zip ./
$~ scp <username>@<ip>:/home/<username>/stack/wordpress/wp-config.php ./
$~ scp <username>@<ip>:/home/<username>/stack/wordpress/backup.sql ./
```
While you're at it. Do not forget to check the version of `php-fpm` running since you cannot migrate from one version of PHP to another.

![PHP Version check](https://poorna-657a.s3.ap-south-1.amazonaws.com/Screenshot+from+2022-10-18+18-44-04.png)

This should lead to you have all the three important files
1. `wp-content.zip`
2. `wp-config.php`
3. `backup.sql`

Now spin up another instance of wordpress while making sure to match the same PHP version.

![New bitnami Installtion](https://poorna-657a.s3.ap-south-1.amazonaws.com/Screenshot+2022-10-18+at+19-02-49+AWS+Marketplace+WordPress+Certified+by+Bitnami+and+Automattic.png)

SSH into the newly logged in instance and delete the following files to make sure they don't overlap.
1. `/home/<username>/stack/wordpress/wp-content`
2. `/home/<username>/stack/wordpress/wp-config.php`

Now lets upload the same file onto the server
```shell
$~ scp ./wp-content.zip <username>@<ip>:/home/<username>/stack/wordpress/wp-content.zip
$~ scp ./wp-config.php <username>@<ip>:/home/<username>/stack/wordpress/wp-config.php
$~ scp ./backup.sql <username>@<ip>:/home/<username>/stack/wordpress/backup.sql
```

Unzip the `wp-content.zip` folder
```bash
$~ unzip ./wp-content.zip
```

Replace the database credentials in the `wp-config.php`
```php
/** The name of the database for WordPress */
define( 'DB_NAME', 'bitnami_wordpress' );
/** Database username */
define( 'DB_USER', '<username>' );
/** Database password */
define( 'DB_PASSWORD', '<password>' );
/** Database hostname */
define( 'DB_HOST', '127.0.0.1:3306' );
```

Restore the sql backup back into the database 
```bash
mysql -u <username> -p bitnami_wordpress < backup.sql
```

Your wordpress deployment should be ready and working. 