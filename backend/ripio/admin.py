from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Currency, Transaction

admin.site.register(User, UserAdmin)
admin.site.register(Currency)
admin.site.register(Transaction)
