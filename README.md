# To-Do List    

A simple task management application built with Laravel v13, MySQL, Bootstrap and jQuery.

## Requirements

- PHP >= 8.2
- Composer
- MySQL

## Installation

### 1. Clone the repository
git clone https://github.com/Nathan-Part/todo-app.git
cd todo-app

### 2. Install dependencies
composer install

### 3. Configure environment
#### Linux / Mac 
cp .env.example .env

#### Windows
copy .env.exemple .env

php artisan key:generate

Edit the file ".env" with your database credentials :
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=your_password

### 4. Run migrations
php artisan migrate

### 5. Start the server
php artisan serve

Visit http://localhost:8000

## Tech Stack

- **Backend** : Laravel v13
- **Database** : MySQL
- **Frontend** : Bootstrap 5, jQuery 3.7