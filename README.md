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

5. Create super user
> python manage.py createsuperuser --email admin@admin.com --username admin
