🔹 1. Install MongoDB PHP Extension
🪟 On Windows (XAMPP, WAMP, etc.)
Download the correct DLL from https://pecl.php.net/package/mongodb

Match your PHP version (e.g., php_mongodb.dll for PHP 8.2, Thread Safety, x64)

Place the .dll in your PHP ext directory
Example:

makefile

C:\xampp\php\ext\php_mongodb.dll

Add this line to php.ini:

ini

extension=php_mongodb.dll
Restart Apache server

Confirm it's installed:

bash

php -m | findstr mongodb

or run a PHP script with phpinfo();

🔹 2. Install PHP MongoDB Library via Composer
Navigate to your project folder:

bash

composer require mongodb/mongodb

This installs the official MongoDB PHP Library.