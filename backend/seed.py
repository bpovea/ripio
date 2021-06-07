import random

from django_seed import Seed


seeder = Seed.seeder()

from ripio.models import User,Transaction, Currency

seeder.add_entity(User, 5, {
    'balance': lambda x: random.randint(5000,50000)/100,
    'password': 'ripio2021'
})

seeder.add_entity(Currency, 3)

users = User.objects.all()

seeder.add_entity(Transaction, 50, {
    'amount': lambda x: random.randint(2500,25000)/100,
})

seeder.execute()
