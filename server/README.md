`cd` into cloned directory and install dependencies. run below command one by one.
```bash

composer install
cp .env.example .env
php artisan key:generate
```
### Configuration in `.env` file

Database **eg.**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=social_login
DB_USERNAME=root
DB_PASSWORD=
```

Database Migration
==================
Run database migrations:
```
php artisan migrate
```
**(Optional)** If you want to get dummy data, run this:
```

php artisan db:seed --class=CreateAdminUserSeeder
## Server Run

Run the dev server:
```
php artisan serve
```

Visit below url:
```
http://localhost:8000
```