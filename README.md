# Ripio

Full-stack Python/React test.

## Backend

Backend deployment steps:

1. Create virtual env and activate
> virtualenv env & sour env/bin/activate

2. Move to backend/ folder
> cd backend/

3. Install requirements
> pip install requirements.txt

4. Make and install migrations
> python manage.py makemigrations & python manage.py migrate

7. Load dump initial data *
> python manage.py shell < seed.py

6. Create super user
> python manage.py createsuperuser --email admin@admin.com --username admin

7. Run project
> python manage.py runserver


## Frontend

Frontend deployment steps:

1. Move to frontend/ folder
> cd frontend/

2. Install dependencies
> npm install

3. Run project
> npm start


## Notes
* *dump users are created randomly, but each user will have the same password. it is 'ripio2021'.