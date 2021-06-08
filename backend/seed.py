import random

from django_seed import Seed

from ripio.models import User,Transaction, Currency


seeder = Seed.seeder()

seeder.add_entity(User, 10, {
    'balance': lambda x: random.randint(5000,50000)/100,
})

seeder.add_entity(Currency, 3)

seeder.add_entity(Transaction, 50, {
    'amount': lambda x: random.randint(2500,25000)/100,
})

seeder.execute()

for u in User.objects.all():
    u.set_password('ripio2021')
    u.save()
