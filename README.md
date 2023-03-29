# SAF

SAF (student administration framework) is my exam-task at my webdeveloper course. It can help to organize students in educational institutions.

Students are paginated (10 student/page) and ordered in alphabetical order.
You can filter them by name and study group.

CRUD operations can be performed on a student. So you can:

- Create (register student personal data, image upload, study group enrollments)
- Read (show the student details)
- Update (update student personal data, image upload, study group enrollments)
- Delete (delete student with softDelete)

Every student is notified via email about every action with his/her profile.

## Prerequisites

- PHP 8.1 or newer
- Composer
- Node.js and npm
- MySQL

## Installation

1. Download the project files or clone the GitHub repository.

2. Open the terminal and navigate to the project root directory.

3. Install dependencies with Composer and npm:

```bash
composer install
npm install
```

4. Create an .env file from the .env.example and set up your MySQL database and smtp credentials and queue connection:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="saf@gmail.com"

QUEUE_CONNECTION=database
```

5. Generate a new application key:

```bash
php artisan key:generate
```

6. Run the database migrations and seeders:

```bash
php artisan migrate --seed

```

7. Build the frontend assets:

```bash
npm run dev
```

8. In a new terminal window navigate to the app root folder and start the Laravel development server:

```bash
php artisan serve

```

9. In a new terminal window navigate to the app root folder and start the laravel worker to processing the queues:

```bash
php artisan queue:work
```

10. Visit http://localhost:8000 in your web browser to see the application running. I hope the use does not cause headaches.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
